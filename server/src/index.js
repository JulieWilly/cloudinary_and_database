import express from 'express'
import cors from 'cors'
import { config }from 'dotenv'
import bodyParser from 'body-parser';
import router from './router/saveImg.js';
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

cloudinary_app.use('/', router)

