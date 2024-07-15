import express from 'express'
import cors from 'cors'
import cloudinary from './cloudinary/cloudinary.js'
import { config }from 'dotenv'
import bodyParser from 'body-parser';

config();
const port = process.env.PORT
const cloudinary_app = express();

cloudinary_app.use(cors({
    origin:'http://localhost:5173',

}
))

cloudinary_app.use(express.json())
cloudinary_app.use(bodyParser({ limit: '50mb'}))
cloudinary_app.use(express.urlencoded({extended: true, limit: '50mb'}))
cloudinary_app.listen(port, () => {
    console.log('server is running on port 3000')
})
cloudinary_app.get('/', (req, res) => {
    res.send('we are here')
})

cloudinary_app.post('/', async (req,res) => {
    const { image } = req.body;
    const uploadedImg = await cloudinary.uploader.upload(image, {
        upload_preset: 'test_preset',
        // public_id: 'avater', // username of the avater - You can add the user to mark every image with its user.
        allowed_formats: [ 'png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'] // allowed files only. No pdfs, videos etc.
    },
    //send error if it occurs and a result if otherwise.

    function (error, result) {
       if(error) {
         console.log(error);
       }
       console.log(result)});

       try{
            res.status(200).json({ success: true, message: "Message uploaded successfully.", data: uploadedImg})

    } catch(error){
        res.status(500).json({ success: false, message: error, da})
    }

    
    
})

