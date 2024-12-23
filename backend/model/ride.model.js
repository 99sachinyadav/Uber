
import mongoose from 'mongoose'
import { User } from './user.model.js';
import { Caption } from './caption.model.js';

const rideSchema= new mongoose.Schema({

     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,

     },
     caption:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Caption,
     },
     pickup:{
        type:String,  
        required:true,
     },
     destination:{
        type:String,
        required:true,
     },
     fare:{
        type:Number,
        required:true,
     },
     status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending'
     },
    
     duration:{
       type:Number,
     },
     distance:{
        type:Number,
     },
     paymentId:{
        type:String,
     },
     orderId:{
        type:String
     },
     signature:{
        type:String
     },
     otp:{
        type:String,
        required:true,
        select:false
     }

},{})

export const Ride = mongoose.model('Ride',rideSchema);      