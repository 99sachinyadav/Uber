import express, { Router } from 'express'
import dotenv from 'dotenv'
 import cors from 'cors'
import dbConnect from './dbConnect.js';
import router from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import captionRouter from './routes/caption.route.js';
import mapRouter from './routes/Maps.route.js';
import Riderouter from './routes/ride.routes.js';
import http from 'http'
 import { initializeSocket } from './Socket/socket.js';
  dotenv.config()
 const app= express();
 const server = http.createServer(app);
 initializeSocket(server);
 const PORT=process.env.PORT
 app.use(cors())
 app.use(express.json());
 app.use(express.urlencoded({extended:true}))
 app.use(cookieParser())
 app.use('/api/user',router);
 app.use('/api/caption',captionRouter)
 app.use('/api/map',mapRouter)
 app.use('/api/ride',Riderouter)
 app.get('/',(req,res)=>{
    res.send("Hellow app");
 })

 server.listen(PORT,()=>{
    dbConnect();
    console.log(`server is running on port ${PORT}`);
 })
 