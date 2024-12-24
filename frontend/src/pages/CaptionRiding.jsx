import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import FinishRide from "../components/FinishRide";
import gsap from "gsap";
import LiveTracking from "../components/Livetracking";

 

const CaptionRiding = () => {
     
    const [openFinishpanel, setopenFinishpanel] = useState(false)
     
     const openFinishRef = useRef(null);
     const location = useLocation();
      const rideData= location.state?.ride
      //console.log(rideData)
     useGSAP(()=>{
       if(openFinishpanel){
        gsap.to(openFinishRef.current,{
            transform:'translate(0%)' 
        })
       }
       else{
        gsap.to(openFinishRef.current,{
            transform:'translate(100%)' 
        })
       }
     },[openFinishpanel])

  return (
    <div className="h-screen">
      
    <Link to='/start' className="fixed right-6 top-4 bg-white p-2 rounded-full"><i className="ri-home-gear-line text-2xl"></i></Link>
    <div className="h-4/5">
    <img
    className="w-24  absolute left-5 top-3"
    src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
    alt=""
  />
    <LiveTracking className="w-full h-full"  />
    </div>
    <div onClick={()=>setopenFinishpanel(true)} className="h-1/5 bg-yellow-400 rounded-xl flex relative items-center">
    <h5 onClick={()=>{
            
         }} className="absolute text-3xl right-44 top-0"><i className="ri-arrow-up-wide-line"></i></h5>
       <div  className=" flex  w-full gap-3 ml-8 items-center justify-between">
        <h1 className="text-xl font-semibold">4 KM away</h1>
        <button onClick={()=>setopenFinishpanel(true)} className="text-md font-semibold px-8 text-white py-2 mr-6 rounded-lg bg-green-600">Complete Ride</button>
        
       </div>
    
    </div>
    <div ref={openFinishRef}  className=" fixed flex  rounded-3xl  pb-6 flex-col w-full translate-y-full z-10 bottom-0 p-3  bg-white">
      <FinishRide rideData={rideData} setopenFinishpanel={setopenFinishpanel}/>
      </div>
</div>
  )
}

export default CaptionRiding