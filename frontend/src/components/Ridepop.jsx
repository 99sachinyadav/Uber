 

const Ridepop = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
            props.setuserRidepanel(false)
         }} className="absolute text-3xl right-9 top-5"><i className="ri-arrow-down-wide-line"></i></h5>
         <h1 className="text-3  mb-2 p-3  text-2xl font-bold">
          New Ride Available!
         </h1>
        <div className="flex flex-col">
        {/* ghfjhrgh */}
       <div  className="p-3 py-4  rounded-lg bg-yellow-400  flex justify-between items-center" >
       <div className="flex items-center gap-2 ">
              <img className="bg-slate-600 w-12 ml-1  border-2 border-black rounded-full" src="https://img.freepik.com/premium-vector/driver-cartoon-vector_889056-101562.jpg" alt="" />
              <h1 className="text-xl font-semibold">{props.ride?.user.firstname +" "+ props.ride?.user.lastname}</h1>
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
           <hr className="w-[350px] h-[2px] mt-3 mr-20 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-currency-line text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">₹{props.ride?.fare}</h1>
            <h3 className="text-md text-gray-800  font-semibold">Cash</h3>  
            </div>
         
           </div>
          
           <button  onClick={()=>{props.setconfirmUserRide(true),props.confirmRide()}} className="mt-4 px-3 py-2 rounded-lg font-semibold text-lg text-white bg-green-600">Accept</button>
           <button  onClick={()=>{props.setuserRidepanel(false)}} className="mt-4 px-3 py-2 rounded-lg font-semibold text-lg text-white bg-gray-500">Ignore</button>
        </div>
    </div>
  )
}

export default Ridepop