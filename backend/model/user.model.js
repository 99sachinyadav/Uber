import mongoose from "mongoose";

import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
 
 const userSchema = new mongoose.Schema({
     
        firstname:{
            type:String,
            reuired:true,
            minlength:[3,'firstname must contain atleast 3 letters']
        },
        lastname:{
            type:String,
            minlength:[3,'firstname must contain atleast 3 letters']
         
    },
    email:{
            type:String,
            unique:true,
            required:true,
            minlength:[5,"email most contain at least 5 letters"]
    },
    socketId:{
        type:String,
    },
   password:{
            type:String,
            required:true,
           select:false,

    },
   
 })

 
//  userSchema.methods.ComparePassword = async(password)=>{
//     console.log(password)
//        return  await  bcrypt.compare(password,this.password);
//  }

 userSchema.statics.hashPassword = async(password)=>{
    const hashedpassword = await bcrypt.hash(password,10);
    return hashedpassword;
 }


 export const User= mongoose.model('User',userSchema);