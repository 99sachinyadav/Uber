import { header } from "express-validator";
import jwt from 'jsonwebtoken'
import { User } from "../model/user.model.js";
import { BlackToken } from "../model/blacklistToken.model.js";


 const authUser= async (req,res,next)=>{
    try {
        
        const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            res.status(401).json({ sucess:false,message:"Unathorized"})
        }
// sma nahi aaya
        const isBlacklisted= await BlackToken.findOne({token:token});

        if(isBlacklisted){
            return res.status(401).json({message:'Unauthorized2'})
        }

        const decodeid=   jwt.verify(token ,process.env.SECRETEKEY);
          const user = await User.findById(decodeid._id)

          req.user=user
    next();

    } catch (error) {
         console.log(error);
         res.status(401).json({ sucess:false,message:error.message})
    }
 }

 export  default authUser