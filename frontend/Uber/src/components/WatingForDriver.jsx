


const WatingForDriver = (props) => {
  return (
    <div>
              <h5 onClick={()=>{
          props.setWaitingDriver(false)
         }} className="absolute text-3xl right-44 top-1"><i className="ri-arrow-down-wide-line"></i></h5>
       <div className="flex justify-between mt-6">
       <img className="h-24  ml-1 mb-6   " src={props.image} alt="" />
          <div className="flex flex-col text-right mt-5 mr-3">
             <h3 className="text-lg font-semibold">{props.myride?.caption.firstname}</h3>
             <h1 className="text-lg font-bold tracking-tighter leading-tight">{props.myride?.caption.vehicals.plate}</h1>
             <h4 className="leading-tight text-gray-700">{props.myride?.caption.vehicals.vehicalType}</h4>
             <h1 className="text-lg font-bold tracking-tighter leading-tight">{props.myride?.otp}</h1>
          </div>
       </div>
        <div className="flex flex-col">
       
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-map-pin-fill text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">562/11-A</h1>
            <h3 className="text-md text-gray-800 font-semibold">{props.myride?.pickup}</h3>  
            </div>
         
           </div>
           <hr className="w-[350px] h-[2px] mt-3 mr-20 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-map-pin-fill text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">562/11-A</h1>
            <h3 className="text-md text-gray-800 font-semibold">{props.myride?.destination}</h3>  
            </div>
         
           </div>
           <hr className="w-[350px] h-[2px] mt-3 mr-20 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-currency-line text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">₹{props.myride?.fare}</h1>
            <h3 className="text-md text-gray-800  font-semibold">Cash</h3>  
            </div>
         
           </div>
          
          
        </div>
    </div>
  )
}

export default WatingForDriver