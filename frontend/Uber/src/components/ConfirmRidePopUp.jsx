import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import {backendUrl} from "../App"


const ConfirmRidePopUp = (props) => {
   const [otp, setotp] = useState('')
     const navigate= useNavigate();
    // console.log(props.ride?._id,otp)

    

      const submithandler = async(e)=>{
         e.preventDefault()
         console.log(props.ride?._id,otp)
         const responce = await axios.get( backendUrl + "/api/ride/start-ride",{
           params:{rideId:props.ride._id,otp:otp},
           headers:{
             Authorization:`bearer ${localStorage.getItem('captionToken')}`
           }
         })
         console.log(responce)

         if( responce.status==200){
           props.setconfirmUserRide(false);
           props.setuserRidepanel(false);
           navigate('/captionriding',{state:{ride:props.ride}})
         }
      }
     // console.log(props.ride)
  return (
    <div>
            <h5 onClick={()=>{
            props.setconfirmUserRide(false)
         }} className="absolute text-3xl right-3 top-5"><i className="ri-arrow-down-wide-line"></i></h5>
         <h1 className="text-3  mb-2 p-3 m text-2xl font-bold">
          Confirm this ride to Start
         </h1>
        <div className="flex flex-col">
        {/* ghfjhrgh */}
       <div  className="p-3 py-4  rounded-lg bg-yellow-400  flex justify-between items-center" >
       <div className="flex items-center gap-2 ">
              <img className="bg-slate-600 w-12 ml-1  border-2 border-black rounded-full" src="https://img.freepik.com/premium-vector/driver-cartoon-vector_889056-101562.jpg" alt="" />
            <h1 className="text-xl font-semibold">{props.ride?.user.firstname+" "+props.ride?.user.lastname}</h1>
            </div>
          <h1 className="text-xl font-semibold">2.2KM</h1>
       </div>
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-map-pin-fill text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">562/11-A</h1>
            <h3 className="text-md text-gray-800 font-semibold">{props.ride?.pickup}</h3>  
            </div>
         
           </div>
           <hr className="w-[350px] h-[1px] mt-3 mr-20 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-map-pin-fill text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">562/11-A</h1>
            <h3 className="text-md text-gray-800 font-semibold">{props.ride?.destination}</h3>  
            </div>
         
           </div>
           <hr className="w-[350px] h-[1px] mt-3 mr-20 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-currency-line text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">₹{props.ride?.fare}</h1>
            <h3 className="text-md text-gray-800  font-semibold">Cash</h3>  
            </div>
         
           </div>
          
          <form   className="mt-12 flex flex-col">
            <input value={otp} onChange={(e)=>{setotp(e.target.value)}} type="text" placeholder="Enter OTP" className="w-full px-6 py-3 rounded-md border-none font-mono mb-3 bg-[#eee] outline-purple-600 placeholder:text-xl text-xl" />
            <button onClick={submithandler}   className="mt-2 px-3 py-2 rounded-lg font-semibold text-center text-lg text-white bg-green-600">Confirm</button>
           
          </form>
          <button  onClick={()=>{ props.setconfirmUserRide(false) ,props.setuserRidepanel(false)}} className=" px-3 py-2 mt-4 rounded-lg font-semibold text-lg text-white bg-red-600">Cancel</button>
        </div>
  
    </div>
  )
}

export default ConfirmRidePopUp