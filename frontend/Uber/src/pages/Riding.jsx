import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SocketContext } from "../context/Socketcontext";
import LiveTracking from "../components/Livetracking";



const Riding = () => {

    const location = useLocation();
     const { ride} = location.state || {}

     const {socket}=useContext(SocketContext);
     const  navigate= useNavigate();
     socket.on('ride-ended',()=>{
       navigate('/start')
     })

  return (
    <div className="h-screen">
      
        <Link to='/start' className="fixed right-6 top-4 bg-white p-2 rounded-full"><i className="ri-home-gear-line text-2xl"></i></Link>
        <div className="h-1/2">
        <img
        className="w-24  absolute left-5 top-3"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
        <LiveTracking className="w-full h-full"  />
        </div>
        <div className="h-1/2">
        <div className="flex justify-between ">
       <img className="h-24  ml-1 mb-6   " src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className="flex flex-col text-right mt-5 mr-3">
             <h3 className="text-lg font-semibold">{ride.caption.firstname}</h3>
             <h1 className="text-lg font-bold tracking-tighter leading-tight">{ride.caption.vehicals.plate}</h1>
             <h4 className="leading-tight text-gray-700">{ride.caption.vehicals.vehicalType}</h4>
          </div>
       </div>
        <div className="flex flex-col px-4 ">
       
           <div className="flex gap-4 ml-6 mt-2    items-center">
           <i className="ri-map-pin-fill text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">562/11-A</h1>
            <h3 className="text-md text-gray-800 font-semibold">{ride.destination}</h3>  
            </div>
         
           </div>
           <hr className="w-[350px] h-[2px] mt-2 mr-10 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-currency-line text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">₹{ride.fare}</h1>
            <h3 className="text-md text-gray-800 font-semibold">Cash Cash</h3>  
            </div>
         
           </div>
            <button className="mt-4 px-3 py-2 rounded-lg font-semibold text-lg text-white bg-green-600">Make a Payment</button>
        </div>
        </div>
    </div>
  )
}

export default Riding