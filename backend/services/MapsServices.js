import axios from 'axios';
import { validationResult } from 'express-validator';
import { Caption } from '../model/caption.model.js';

const getAddress = async (req, res) => {
  const { address } = req.params; // Get address from URL params
 // console.log('Received address:', address);

  // Validate address parameter
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, message: errors.array() });
//   }

  if (!address) {
    return res.status(400).json({ success: false, message: 'Please provide an address' });
  }

 
  

  try {
     
    const coordinates = await getCoordinatesFromAddress(address);

    if (coordinates) {
       
      return res.json(coordinates);
    } else {
       
      return res.status(404).json({ success: false, message: 'No coordinates found for this address' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching coordinates', error: error.message });
  }
};

const getCoordinatesFromAddress = async (address) => {
 // console.log('Fetching coordinates for:', address);
//https://maps.gomaps.pro/maps/api/geocode/json
  try {
    // Make sure the GoMap API endpoint is correct
    const response = await axios.get('https://maps.gomaps.pro/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.API_KEY, // Ensure you have a valid API key here
      },
    });

    // Log the response for debugging
  //  console.log('API Response:', response.data);

    // Check if results exist in the response
    if (response.data && response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng }; // Return coordinates
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null; // Return null if there's an error
  }
};

const getDistance = async (req,res)=>{
//https://maps.gomaps.pro/maps/api/distancematrix/json?
// destinations=siwan Bihar&origins=rajiv colony mohan nagar ghaziabad&

      const {destinations,origins}=req.query;
 
      if(!destinations && !origins){
        return  res.status(401).json({sucess:false,message:"please enter the entire information"});
      }
      
       const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(403).json({sucess:false,message:errors.array()});
       }
  // console.log(destinations,origins)
       const  {distance ,duration}= await distanceTime(destinations,origins);
       // console.log( "distance",distance,"duration1",duration)

       if(!distance && !duration){
        return res.status(200).json({sucess:false ,  message:"distance or duration can not be found"})
       }
       res.status(200).json({sucess:true , distance,duration})
}
 
const distanceTime = async(destinations,origins)=>{
  try {

    const response = await axios.get('https://maps.gomaps.pro/maps/api/distancematrix/json',{
      params:{
        destinations:destinations,
        origins:origins,
        key:process.env.API_KEY
      },
    })
    const element = response.data.rows[0]?.elements[0];
   // console.log(element)
    // console.log(element.distance.text)
    // console.log(element.duration.text)
    const distance=element.distance.text
    const distanceval=element.distance.value
    const duration =element.duration.text
    const durationval= element.duration.value
      return {distance ,duration,durationval,distanceval}
  } catch (error) {
    console.log(error)
  }
}


const getSuggestations = async (req,res)=>{
       
    try {
      const {input} = req.query;
      if(!input){
        return res.status(401).json({sucess:false,message:"query is required"})
      }

      const errors= validationResult(req);
      if(!errors.isEmpty()){
        return res.status(402).json({sucess:false,message:errors.array()})
      }
//https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=Rajiv colony Ghaziabad&key= AlzaSy6klDXkOcj5Y-o6Ngt4rC0mGJD_VoUeLrK
    const responce = await axios.get('https://maps.gomaps.pro/maps/api/place/queryautocomplete/json',{
       params:{
        input:input,
        key:process.env.API_KEY
       }
    })

      //console.log(responce)
      if(!responce.data.predictions){
        return res.status(401).json({sucess:false,message:"invalid place"})
      }
    
       res.status(200).json({sucess:true,message:"suggestions fetched",responce:responce.data.predictions})
      
    } catch (error) {
      console.log(error);
      res.status(402).json({sucess:false,message:error.message})
    }

}

//radius in km
const getCaptionIntheRadius = async (ltd,lng,radius)=>{
  //this will return all the caption present in the radius in which user is ;
  const captions = await Caption.find({
    location:{
      $geoWithin:{
        $centerSphere:[[ltd,lng],radius/6371]
     }
    }
    
  })
  return captions
}

export { getAddress , getDistance,getSuggestations,distanceTime,getCaptionIntheRadius,getCoordinatesFromAddress};   
