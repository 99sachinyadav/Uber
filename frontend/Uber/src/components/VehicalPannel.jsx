 

const VehicalPannel = (props) => {
  return (
    <div>
              <h5 onClick={()=>{
          props.setvehicalpanel(false)
         }} className="absolute text-3xl right-9 top-5"><i className="ri-arrow-down-wide-line"></i></h5>
         <h1 className="text-3  mb-2 p-3  text-2xl font-semibold">
          Choose a Vehicals
         </h1>
        <div onClick={()=>{ props.setimage("https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"), props.setvehicalType('car') ,props.setconfirmride(true)}} className="flex  w-full mb-2 items-center border-2 border-gray-400 active:border-black  rounded-lg ">
             <img className=" w-[110px]    " src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
              <div className=" flex flex-col py-2 leading-tight">
                <h1 className="text-xl font-bold">UberGo</h1>
                <h3 className="text-md font-bold">2 min away</h3>
                <h2 className="text-[13px] text-gray-800 font-semibold">Affordable, compact rides</h2>
              </div>
              <h1 className="text-xl font-semibold  flex  w-20 items-center justify-center">₹{props.fare.car}</h1>
        </div>
        <div onClick={()=>{props.setimage('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'), props.setvehicalType('moto') ,props.setconfirmride(true)}} className="flex  w-full mb-2 items-center border-2 border-gray-400 active:border-black  rounded-lg ">
             <img className=" w-[80px]  mr-6   " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
              <div className=" flex flex-col py-2 leading-tight">
                <h1 className="text-xl font-bold">UberGo</h1>
                <h3 className="text-md font-bold">2 min away</h3>
                <h2 className="text-[13px] text-gray-800 font-semibold">Affordable, compact rides</h2>
              </div>
              <h1 className="text-xl font-semibold  flex w-20 items-center justify-center">₹{props.fare.moto}</h1>
        </div>
        <div onClick={()=>{ props.setimage('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png'), props.setvehicalType('auto') ,props.setconfirmride(true)}} className="flex  w-full mb-2 items-center border-2 border-gray-400 active:border-black   rounded-lg ">
             <img className=" w-[75px]  mr-6   " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
              <div className=" flex flex-col py-2 leading-tight">
                <h1 className="text-xl font-bold">UberGo</h1>
                <h3 className="text-md font-bold">2 min away</h3>
                <h2 className="text-[13px] text-gray-800 font-semibold">Affordable, compact rides</h2>
              </div>
              <h1 className="text-xl font-semibold  flex  w-20 items-center justify-center">₹{props.fare.auto}</h1>
        </div>


    </div>
  )
}

export default VehicalPannel