import {PrismaClient} from '@prisma/client'
import cloudinary from '../cloudinary/cloudinary.js'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.post('/upload', async (req,res) => {
    const { image } = req.body;
    const uploadedImg = await cloudinary.uploader.upload(image, {
        upload_preset: 'test_preset',
        // public_id: 'avater', // username of the avater - You can add the user to mark every image with its user.
        allowed_formats: [ 'png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'] // allowed files only. No pdfs, videos etc.
    },
    //send error if it occurs and a result if otherwise.

    async function (error, result) {
       if(error) {
         console.log(error);
       }
        console.log('image details', result.url)

     try{
        const {imgUrl } = req.body;
        // console.log(image)
        await prisma.images.create({
            data: {
                imgUrl: result.url
            }
        })
            res.status(200).json({ success: true, message: "Message uploaded successfully.", data: uploadedImg})

    } catch(error){
        res.status(500).json({ success: false, message: error})
    }
       });

      
})

router.get('/image', async(req, res) => {
    try{

        const getImage = await prisma.images.findMany({
            select: {
                imgUrl: true
            }
        })

            res.json({success: true, message: "Image found successfully" , data: getImage})
    } catch(error) {
        res.status(500).json({ success: false, message: error})
    }
})

export default router

