import express from 'express'
import cors from 'cors'
import { config }from 'dotenv'

config();
const cloudinary = express();
cloudinary.use(cors())

cloudinary.use(express.json())
cloudinary.use(express.urlencoded({extended: true, limit: '50mb'}))

cloudinary.listen(3000, () => {
    console.log('server is running on port 3000')
})
cloudinary.get('/', (req, res) => {
    res.send('we are here')
})

