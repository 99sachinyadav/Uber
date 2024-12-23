import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
 
import { BlackToken } from "../model/blacklistToken.model.js";

 const generateAuthToken = (id)=>{
     const token= jwt.sign({_id:id},process.env.SECRETEKEY,{expiresIn:'24h'})
     return token;
 }
const RegisterUser = async (req,res)=>{
           
  try {
      const {firstname,lastname,email,password}=req.body;
      
      
        if(!firstname||!email||!password){
        
          return res.status(402).json({sucess:false,message:'plesae enter full data'})
        }
         

          
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
        }
        
       const existedUser= await User.findOne({
          $or:[{email},{password}]
        })
  
        if(existedUser){
         return res.json({sucess:false,message:"user already exist"});
        }
   
        const hashedpassword  = await User.hashPassword(password)
        const newuser =new User({
           firstname,
             lastname,
             email,
             password:hashedpassword
        });
  
          const savedUser=await newuser.save();
           const token= generateAuthToken(savedUser._id);
           res.status(201).json({sucess:true,token,savedUser})
  } catch (error) {
        console.log(error)
        res.json({sucess:false,message:error.message})
  }
}

const loginUser= async(req,res)=>{
         
      try {
         const {email,password}=req.body;
         if(!email||!password){
            return res.status(402).json({sucess:false,message:'plesae enter full data'})
          }
            
         const errors= validationResult(req);
         if(!errors.isEmpty()){
            res.json({sucess:false ,errors:errors.array()})
         }

         const user = await User.findOne({
            $or:[{email}]
         }).select('+password');

         if(!user){
            return res.status(401).json({sucess:false,message:'Invalid email or password'});
         }
        // console.log(password)
         const isMatch = await  bcrypt.compare(password,user.password);

         if(!isMatch){
            return res.status(401).json({sucess:false,message:'Invalid email or password'});
         }
          const token =   generateAuthToken(user._id);
           res.cookie('token',token)
          res.status(200).json({sucess:true,token,user});

      } catch (error) {
        console.log(error)
        res.json({sucess:false,message:error.message})
      }
}


const getProfile= async(req,res)=>{
    const user=req.user;
   // console.log(user);
        res.status(200).json({sucess:true,user})
}

const  logout= async(req,res)=>{
       try {
        res.clearCookie('token')

        const token = req.cookies.token||req.headers.authorization?.split(' ')[1];
         await BlackToken.create({token});
           res.status(200).json({message:"Logged Out"})
       } catch (error) {
         console.log(error)
          res.json({sucess:false,message:error.message})
       }
}

export {
    RegisterUser,
    loginUser,
    getProfile,
    logout
}