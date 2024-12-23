import { cookie, validationResult } from "express-validator";
import { Caption } from "../model/caption.model.js";
import { BlackToken } from "../model/blacklistToken.model.js";

 
 const registercaption = async(req,res)=>{
      try {

        const {firstname,lastname,email,password,color,plate,capacity,vehicalType}=req.body;
           // console.log(firstname,email,password,color,plate,capacity,vehicalType);
        if(!firstname||!email||!password||!color||!plate||!capacity||!vehicalType){
          return res.status(401).json({message:"All fields are required"})
        }

        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(402).json({sucess:false,errors:errors.array()})
        }
        
        const  existedCaption= await Caption.findOne({
           $or:[{email},{password}]
        })
        if(existedCaption){
          return res.json({sucess:false,message:"Caption already exist"});
         }
    const hashedpassword = await Caption.hashPassword(password)
         const createdCaption= await Caption.create({
          firstname,
          lastname,
          email,
          password:hashedpassword,
          vehicals:{
            color,
            plate,
            capacity,
            vehicalType,
          }
         })

       const captiontoken=  await createdCaption.genAuthToken();
       res.status(201).json({sucess:true,captiontoken,createdCaption})
      } catch (error) {
        console.log(error);
        res.status(401).json({sucess:false,message:error.message})
      }
 }

 const loginCaption= async (req,res)=>{
  try {

      const {email,password}= req.body
      if(!email||!password){
        return    res.status(403).json({sucess:false,message:"please fill full detais"});
      }
      
      const errors= validationResult(req);
      if(!errors.isEmpty()){
        return res.json({sucess:false,errors:errors.array()})
      }
      
      const caption = await Caption.findOne({email}).select('+password');
       if(!caption){
        return res.status(401).json({sucess:false,message:"caption  does not exist"});
       }
       const isMatch = await caption.ComparePassword(password);
       if(!isMatch){
         return res.status(401).json({sucess:false,message:'Invalid caption Credentials'});
       }

         const captionToken= await caption.genAuthToken();
         
         res.cookie('captionToken',captionToken) 

         res.status(201).json({sucess:true,captionToken,caption})
    
  } catch (error) {
    console.log(error);
        res.status(401).json({sucess:false,message:error.message})
  }
 } 

  const logoutcaption = async (req,res)=>{
         
       try {
        res.clearCookie('captionToken')
        const token = req.cookies.captionToken ||req.headers.authorization?.split(' ')[1];

        await BlackToken.create({token});
        res.status(200).json({message:"Logged Out"});
       } catch (error) {
        console.log(error);
        res.status(401).json({sucess:false,message:error.message})
       }
  }

  const captionProfile = async (req,res)=>{
           const caption = req.caption;
           res.status(200).json({sucess:true, caption})
  }

 export {
    registercaption,
    loginCaption,
    logoutcaption,
    captionProfile
 }