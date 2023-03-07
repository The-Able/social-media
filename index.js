import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'

const app = express();
dotenv.config();

// to serve images for public
// app.use(express.static('public')); 
// app.use('/images', express.static('images'));

//Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

// Setting up server
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`))

// Connecting to mongoDB
const CONNECTION_URL = process.env.MONGO_URI

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err) return console.error(err);
    console.log("Connected to MongoDB")
})

//Routes
app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/user', UserRoute)
app.use('/api/v1/posts', PostRoute)
app.use('/api/v1/upload', UploadRoute)
app.use('/api/v1/chat', ChatRoute)
app.use('/api/v1/message', MessageRoute)



// Deploying Frontend & Backend

if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'views','build')))
        res.sendFile(path.resolve(__dirname,'views','build','index.html'))
    })
}
