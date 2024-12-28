import { Ride } from "../model/ride.model.js";
import { distanceTime, getCaptionIntheRadius, getCoordinatesFromAddress } from "../services/MapsServices.js";
import crypto from 'crypto'
import { sendMessageToSocketId } from "../Socket/socket.js";
import { validationResult } from "express-validator";
// const crypto = require('crypto');
const getFare = async (pickup,destination)=>{
    try { 
         // console.log(pickup,destination)
        if(!pickup||!destination){
          return res.json({sucess:false,message:"PickUp and Destination is required"})
        };
    const {distance ,distanceval,durationval}=  await distanceTime(destination,pickup);
   // console.log(distanceval,durationval)
    const baseFare ={
      auto:30,
      car:50,
      moto:20,
    }
    const perKmRate={
      auto:10,
      car:15,
      moto:8,
    }
    const perMinutes={
      auto:2,
      car:3,
      moto:1.5
    }

    const  fare ={
      auto: Math.round(baseFare.auto +((distanceval/1000)*perKmRate.auto)+((durationval/60)*perMinutes.auto)),
      car: Math.round(baseFare.car +((distanceval/1000)*perKmRate.car)+((durationval/60)*perMinutes.car)),
      moto: Math.round(baseFare.moto +((distanceval/1000)*perKmRate.moto)+((durationval/60)*perMinutes.moto)),
    }

     return fare;
  } catch (error) {
       console.log(error) 
  }

}


const createRide = async (req,res)=>{   
     
       try {
         const user = req.user;

        const {pickup,destination,vehicalType}=req.body;
            // console.log(pickup,destination,vehicalType)
        if(!user||!pickup||!destination||!vehicalType){
            return res.status(401).json({sucess:false,message:"please  enter the entire details"});
        }

         const fare = await getFare(pickup,destination);

          const ride = await Ride.create({
                user,
                pickup,
                destination,
                fare:fare[vehicalType],
                otp:generateOTP(6)
          })
          
        res.status(200).json({sucess:true,message:"ride is created in the database",ride});
     const location =  await  getCoordinatesFromAddress(pickup)
   const captions =   await getCaptionIntheRadius(location.latitude,location.longitude,2)
      
      // console.log("mylocation",location)

       ride.otp=""

  const captionWithuser  = await Ride.findOne({_id:ride._id}).populate("user")
  console.log("mycaptions",captions)
  //console.log("76===================================================================================")
       captions.map(caption=>{
        console.log(caption)
        sendMessageToSocketId(caption.socketId,{
          event:'new-ride',
          data:captionWithuser
        })
       })

       } catch (error) { 
        console.log(error)
        res.status(403).json({sucess:false,message:error.message})
        
       }

}



function generateOTP(num) {
  // Ensure that num is a positive integer and at least 1
  if (num <= 0 || !Number.isInteger(num)) {
    throw new Error('The number of digits must be a positive integer');
  }

  // Generate a random buffer of the required length
  const buffer = crypto.randomBytes(num);

  // Convert the buffer into a string of digits
  const otp = Array.from(buffer)
    .map(byte => byte % 10)  // Take each byte and reduce it to a digit (0-9)
    .slice(0, num)           // Ensure the OTP is exactly 'num' digits
    .join('');               // Join the digits into a single string

  return otp;
}


 const generateFare = async (req,res)=>{
        
  try {
    const {pickinput,destinationinput} = req.query
    if(!pickinput||!destinationinput){
      return res.json({sucess:false,message:"PickUp and Destination is required"})
    };
     const fare = await getFare(pickinput,destinationinput);
       
     res.status(200).json({sucess:true,fare,message:"fare calculated"})
  } catch (error) {
    console.log(error)
    res.json({sucess:false,message:error.message})
  }
 }

 const Confirmride = async(req,res)=>{
    
  try {

    const {rideId } = req.body;
     const caption = req.caption;
     if(!rideId){
      return res.json({sucess:false,message:" ride id not found"})
     }

     const errors = validationResult(req);
     if(!errors.isEmpty()){
      return res.status(402).json({sucess:false,message:errors.array()})
     }
          await Ride.findOneAndUpdate({
             _id:rideId
          },{
            status:'accepted',
            caption:caption._id
          })

     const ride =  await Ride.findOne({
      _id:rideId
     }).populate('user').populate('caption').select('+otp');

     if(!ride){
       return res.json({sucess:false,message:"ride not found"});
     }
     
     sendMessageToSocketId(ride.user.socketId,{
       event:'ride-confirmed',
       data:ride,
     })

  } catch (error) {
     console.log(error)
     res.status(401).json({sucess:false,message:error.message})
  }
 }


 const StartRide = async (req,res)=>{
  try {
    const {otp,rideId}=req.query;
  //  console.log(otp,rideId)
    const caption = req.caption;
    if(!otp && !rideId){
      return res.status(402).json({sucess:false,message:"otp and rideId required"})
    }

    const errors= validationResult(req);
    if(!errors.isEmpty()){
      return res.status(402).json({sucess:false,message:errors.array()})
    }

    const ride = await Ride.findById(rideId).populate('user').populate('caption').select('+otp');

    if(!ride){
      return res.status(402).json({sucess:'false',message:"ride not found"})
    }

    if(ride.status!=='accepted'){
      return res.status(402).json({sucess:'false',message:"ride not accepted"})
    }
    
    if(ride.otp!==otp){
      return res.status(402).json({sucess:'false',message:"invalid ride otp"})
    }
    await Ride.findByIdAndUpdate(rideId,{status:'ongoing'})

    sendMessageToSocketId(ride.user.socketId,{
      event:'ride-started',
      data:ride
    })
    console.log("userdata",ride)
  res.status(200).json({sucess:true,ride})
  } catch (error) {
    console.log(error)
    res.status(401).json({sucess:false,message:error.message})
  }
 }  
   const Endride = async (req,res)=>{
           try {

         const {rideId} = req.body;
          const caption = req.caption;
        //   console.log(rideId)
         if(!rideId){
          return  res.status(403).json({sucess:false,message:"rideId not found"})
         }

         const errors = validationResult(req);
         if(!errors.isEmpty()){
         return  res.status(403).json({sucess:false,message:errors.array()})
         }

        const ride =   await Ride.findById(rideId).populate('user').populate('caption').select('+otp')
        
        if(!ride){
          return res.status(403).json({sucess:false,message:"ride not found"})
        }

        if(ride.status!=='ongoing'){
          return res.status(403).json({sucess:false,message:"ride is not ongoing"})
        }

            await Ride.findByIdAndUpdate(rideId,{
          status:'completed'

        })


        sendMessageToSocketId(ride.user.socketId,{
          event:'ride-ended',
          data:ride
        })

            res.status(200).json({sucess:true,ride})
        
           } catch (error) {
            console.log(error)
            res.status(403).json({sucess:false,message:error.message})
            
           }
   }
export {createRide,getFare,generateOTP,generateFare,Confirmride,StartRide,Endride}
  
