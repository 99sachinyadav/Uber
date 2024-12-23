import axios from "axios"
import { Link, useNavigate} from "react-router-dom"

 

const FinishRide = (props) => {
   const navigate = useNavigate()
   console.log(props.rideData._id)
   const EndRide= async()=>{
       const responce = await axios.post('http://localhost:5000/api/ride/end-ride',{rideId:props.rideData._id},
      { headers:{
        Authorization:`bearer ${localStorage.getItem('captionToken')}`
      }}
      )
      console.log(responce)
    if(responce.status===200){
      props.setopenFinishpanel(false)
      navigate('/captionstart')
    }
    
    }

  return (
    <div>
    <h5 onClick={()=>{
      props.setopenFinishpanel(false)
 }} className="absolute text-3xl right-3 top-5"><i className="ri-arrow-down-wide-line"></i></h5>
 <h1 className="text-3  mb-2 p-3 m text-2xl font-bold">
  Finish this Ride
 </h1>
<div className="flex flex-col">
{/* ghfjhrgh */}
<div  className="p-3 py-4  rounded-lg bg-yellow-400  flex justify-between items-center" >
<div className="flex items-center gap-2 ">
      <img className="bg-slate-600 w-12 ml-1  border-2 border-black rounded-full" src="https://img.freepik.com/premium-vector/driver-cartoon-vector_889056-101562.jpg" alt="" />
      <h1 className="text-xl font-semibold">{props.rideData?.user.firstname}</h1>
    </div>
  <h1 className="text-xl font-semibold">2.2KM</h1>
</div>
   <div className="flex gap-4 ml-6 mt-3    items-center">
   <i className="ri-map-pin-fill text-xl"></i>
    <div className="leading-sung">
    <h1 className="text-2xl font-semibold">562/11-A</h1>
    <h3 className="text-md text-gray-800 font-semibold">{props.rideData?.pickup}</h3>  
    </div>
 
   </div>
   <hr className="w-[350px] h-[1px] mt-3 mr-20 bg-slate-600 " />
   <div className="flex gap-4 ml-6 mt-3    items-center">
   <i className="ri-map-pin-fill text-xl"></i>
    <div className="leading-sung">
    <h1 className="text-2xl font-semibold">562/11-A</h1>
    <h3 className="text-md text-gray-800 font-semibold">{props.rideData?.destination}</h3>  
    </div>
 
   </div>
   <hr className="w-[350px] h-[1px] mt-3 mr-20 bg-slate-600 " />
   <div className="flex gap-4 ml-6 mt-3    items-center">
   <i className="ri-currency-line text-xl"></i>
    <div className="leading-sung">
    <h1 className="text-2xl font-semibold">₹{props.rideData?.fare}</h1>
    <h3 className="text-md text-gray-800  font-semibold">Cash</h3>  
    </div>
 
   </div>
  
  
  <button  onClick={EndRide}  className=" px-3 py-2 mt-12 rounded-lg font-semibold text-center text-lg text-white bg-green-600">Finish Ride</button >
   <p className="text-sm text-center mt-4 ">Click finish button if you have complatred the ride</p>
</div>

</div>
  )
}

export default FinishRide