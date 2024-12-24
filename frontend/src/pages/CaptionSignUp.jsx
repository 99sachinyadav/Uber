import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { CaptionDataContext } from "../context/CaptionContext";
 

import { backendUrl } from "../App";

// "firstname":"test10",
// "lastname":"testlast",

// "email":"rytyi@gmail.com",
// "password":"9997858",

// "color":"red",
// "plate":"trtruyerur",
// "capacity":4,
// "vehicalType":"bike"


 

const CaptionSignUp = () => {
  const [firstname,setfirstname]=useState('')
  const [lastname,setlastname]=useState('')
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const[color,setcolor]=useState('');
  const[plate,setplate]=useState('');
  const[vehicalType,setvehicalType]=useState('');
  const[capacity,setcapacity]=useState('');
  const {createdCaption,setcreatedCaption} =useContext(CaptionDataContext);
   const navigate= useNavigate();
  const submithandler =async (e)=>{
   try {
        e.preventDefault()
    const captiondata=   {
         firstname:firstname ,
         lastname:lastname ,
           email:email,
           password:password,
           color:color,
           plate:plate,
           capacity:capacity,
           vehicalType:vehicalType,
       }
   //console.log(captiondata)
       const responce = await axios.post(backendUrl+"/api/caption/register",captiondata)
 
       console.log(responce);
       if(responce.status===201 && responce.data.sucess){
        //console.log(responce.data.createdCaption)
        localStorage.setItem('caption',JSON.stringify(responce.data.createdCaption))
        //setcreatedCaption(responce.data.createdCaption)
       
         navigate('/captionstart')
         console.log(createdCaption)
       }
      
       
       
        setfirstname('')
       setlastname('')
        setemail('')
        setpassword('')
        setcolor('')
        setplate('')
        setcapacity('')
        console.log(createdCaption)
   } catch (error) {
      console.log(error)
   }
      
  }
  return (
    <div className="w-full h-screen flex flex-col justify-between ">
    <div>
      <img
        className="w-24 ml-4 mt-0"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <form action="" onSubmit={(e)=>submithandler(e)} className="flex flex-col   mt-1">
        <div className="ml-7 flex flex-col gap-1  mr-7">
          <h3 className="text-lg font-semibold"> What's your name</h3>
        <div className="flex   gap-2 w-full justify-between">
        <input
            className="outline-none w-1/2 rounded-md px-2 py-2 mb-3 bg-[#eeeeee]    border text-lg "
            type="text"
             value={firstname}
             onChange={(e)=>setfirstname(e.target.value)}
            placeholder="First name"
          />
        <input
            className="outline-none placeholder:text-base  w-1/2 rounded-md px-2 py-2 mb-3 bg-[#eeeeee]   border text-lg "
            type="text"
             value={lastname}
             onChange={(e)=>setlastname(e.target.value)}
            placeholder="Last name"
          />
        </div>
        </div>
        <div className="ml-7 flex flex-col gap-1">
          <h3 className="text-lg font-semibold"> What's your email</h3>
          <input
            className="outline-none rounded-md px-3 py-2 mb-3 bg-[#eeeeee] w-68 mr-6 border text-lg "
            type="email"
             value={email}
             onChange={(e)=>setemail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div className="ml-7 flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Enter Password</h3>
          <input
            className="outline-none rounded-md mb-3 px-3 py-2 bg-[#eeeeee] w-68 mr-6 border text-lg "
            type="text"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <div className="ml-7 flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Vehicals Information</h3>
         <div className="w-full flex  gap-2  justify-center  ">
         <input
            className="outline-none w-1/2 rounded-md mb-3 px-3 py-2 bg-[#eeeeee]  border text-lg "
            type="text"
            value={color}
            onChange={(e)=>setcolor(e.target.value)}
            placeholder="Vehical color"
          />
         <input
            className="outline-none w-1/2 rounded-md mb-3 px-3 py-2 bg-[#eeeeee] mr-4  border text-lg "
            type="text"
            value={plate}
            onChange={(e)=>setplate(e.target.value)}
            placeholder="vehical plate"
          />
         </div>
         <div className="w-full flex  gap-2  justify-center  ">
         <input
            className="outline-none w-1/2 rounded-md mb-3 px-3 py-2 bg-[#eeeeee]  border text-lg "
            type="Number"
            value={capacity}
            onChange={(e)=>setcapacity(e.target.value)}
            placeholder="Vehical Capacity"
          />
      
        <select   value={vehicalType} onChange={(e)=>setvehicalType(e.target.value)} name="" id="" className="outline-none w-1/2 mr-3 rounded-md mb-3  py-2 bg-[#eeeeee]  border text-lg ">
          <option value="car">car</option>
          <option value="bike">bike</option>
          <option value="auto">auto</option>
        </select>
         </div>
        </div>

      
        





        <button className="px-4 py-2 mt-2  text-lg rounded-md bg-black text-white font-semibold  m-4  ">
         Create a Account
        </button>
      </form>
      <p className="text-center text-[16px] font-semibold">
         Already have a account?
        <Link className="text-blue-600" to="/caption-login">
          Login here
        </Link>
      </p>
    </div>
  
     <p className="text-xs font-semibold mb-6 ml-6 text-tight">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio provident omnis quidem nulla aspernatur totam, ducimus temporibus quae nihil, </p>
   
  </div>
  )
}

export default CaptionSignUp