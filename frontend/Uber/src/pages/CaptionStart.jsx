import { Link } from "react-router-dom"
import CaptionDetails from "../components/CaptionDetails"
import Ridepop from "../components/Ridepop"
import { useContext, useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ConfirmRidePopUp from "../components/ConfirmRidePopUp"
import { CaptionDataContext } from "../context/CaptionContext"
import { SocketContext } from "../context/Socketcontext"
import axios from 'axios'
import LiveTracking from "../components/Livetracking"
 
 


const CaptionStart = () => {

 // const {caption,setcaption}=useContext(CaptionDataContext);
  const {socket}=useContext(SocketContext);
   const [ride, setride] = useState(null)
   
   const [userRidepanel, setuserRidepanel] = useState(false)
     const userRideRef = useRef(null)
    const [confirmUserRide, setconfirmUserRide] = useState(false)
   
      const confirmuserRef=useRef(null);
 
  // ham local host per live location nahi nikal sakte to hame real browser per sa location nikalana hoga 
  //ham port forwoding ka use kar ka ya kar sakte hai
  
  socket.on('new-ride',(data)=>{
   // console.log("myride",data)
    setride(data)
    setuserRidepanel(true)
  
  })

   const confirmRide =  async()=>{
     
     const responce = axios.post('http://localhost:5000/api/ride/confirmride',{
      rideId:ride._id,
     },{
      headers:{
      Authorization:`bearer ${localStorage.getItem('captionToken')}`
      }
     })
     setuserRidepanel(false),
     setconfirmUserRide(true)
   }  


 const caption=JSON.parse(localStorage.getItem("caption"))
  useEffect(()=>{
     socket.emit("join",{userType:'caption', userId:caption._id})
    // console.log(caption)
     function updateLiveLocation() {
      if (!navigator.geolocation) {
          console.log("Geolocation is not supported by your browser.");
          return;
      }
  
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          // console.log({
          //   userId:caption._id,
          //  location:{
          //   ltd:position.coords.latitude,
          //   lng:position.coords.longitude
          //  }
          // })
          
          socket.emit('update-location-caption',{
            userId:caption._id,
           location:{
            ltd:position.coords.latitude,
            lng:position.coords.longitude
           }
          })
        }
        ) }
      }
    
    updateLiveLocation()
 const locationInterval = setInterval(updateLiveLocation,10000);
  // return ()=>clearInterval(locationInterval);

  },[caption])




useGSAP(()=>{
    if(userRidepanel){
      gsap.to(userRideRef.current,{
        transform:'translate(0%)'
 })
    }
    else{
      gsap.to(userRideRef.current,{
        transform:'translate(100%)'
      })
    }
},[userRidepanel])

useGSAP(()=>{
    if(confirmUserRide){
      gsap.to(confirmuserRef.current,{
        transform:'translate(0%)'
 })
    }
    else{
      gsap.to(confirmuserRef.current,{
        transform:'translate(100%)'
      })
    }
},[confirmUserRide])
      
 return (
    <div className="h-screen">
        <Link to='/start' className="fixed right-6 top-4 bg-white p-2 rounded-full"><i className="ri-logout-box-r-line text-2xl"></i></Link>
        <img
        className="w-24  absolute left-5 top-3"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
        <div className="h-3/5">
        <LiveTracking  className="w-full h-full"/>
     
        </div>
        <div className="h-2/5">
        <CaptionDetails/>
        </div>
        <div  ref={userRideRef}  className=" fixed flex  rounded-3xl pb-8 flex-col w-full z-10 bottom-0 p-3 translate-y-full bg-white">
             <Ridepop ride={ride} confirmRide={confirmRide} setconfirmUserRide={setconfirmUserRide} setuserRidepanel={setuserRidepanel} />
          </div>
        <div   ref={confirmuserRef}  className=" fixed flex  rounded-3xl pb-8 flex-col w-full h-screen z-10 bottom-0 p-3 translate-y-full bg-white">
             <ConfirmRidePopUp ride={ride}  setconfirmUserRide={setconfirmUserRide} setuserRidepanel={setuserRidepanel}/>
          </div>
    </div>
  )
}

export default CaptionStart