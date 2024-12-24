

//pickinput={pickinput} destinationinput={destinationinput} fare={fare} vehicalType={vehicalType}
const LookingforCaption = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
          props.setLookingCaption(false)
         }} className="absolute text-3xl right-9 top-5"><i className="ri-arrow-down-wide-line"></i></h5>
         <h1 className="text-3  mb-2 p-3  text-2xl font-semibold">
          Looking for a Driver
         </h1>
        <div className="flex flex-col">
        <img className="h-40  ml-12 " src={props.image} alt="" />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-map-pin-fill text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">562/11-A</h1>
            <h3 className="text-md text-gray-800 font-semibold">{props.pickinput}</h3>  
            </div>
         
           </div>
           <hr className="w-[350px] h-[2px] mt-3 mr-20 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-map-pin-fill text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">562/11-A</h1>
            <h3 className="text-md text-gray-800 font-semibold">{props.destinationinput}</h3>  
            </div>
         
           </div>
           <hr className="w-[350px] h-[2px] mt-3 mr-20 bg-slate-600 " />
           <div className="flex gap-4 ml-6 mt-3    items-center">
           <i className="ri-currency-line text-xl"></i>
            <div className="leading-sung">
            <h1 className="text-2xl font-semibold">₹{props.fare[props.vehicalType]}</h1>
            <h3 className="text-md text-gray-800  font-semibold">Cash</h3>  
            </div>
         
           </div>
          
          
        </div>
    </div>
  )
}

export default LookingforCaption