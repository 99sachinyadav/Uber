import { useState } from "react";
import { Link } from "react-router-dom"
import axios from 'axios'
 import { useContext } from "react";
 import { UserDataContext } from "../context/UserContext";
 import { useNavigate } from "react-router-dom";
 
 import { backendUrl } from "../App";
const UserSignin = () => {
  const [firstname,setfirstname]=useState('')
  const [lastname,setlastname]=useState('')
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
 
  const navigate = useNavigate();
  const {user,setuser} =useContext(UserDataContext)
  const submithandler = async (e)=>{
       e.preventDefault()
  const userData={
        firstname:firstname ,
        lastname:lastname ,
          email:email,
          password:password,
      }
      // console.log(userData)
       const responce = await axios.post(backendUrl+'/api/user/register',userData)
     console.log(responce)
        if(responce.status===201 && responce.data.sucess){
          localStorage.setItem('user',JSON.stringify(responce.data.savedUser))
          //setuser(responce.data.savedUser)
          navigate('/start')
         
        // console.log(responce.data.savedUser)
        }
       // console.log(savedUser)
       
       setfirstname('')
      setlastname('')
       setemail('')
       setpassword('')
  }
 // console.log(user)
  return (
    <div className="w-full h-screen flex flex-col justify-between ">
    <div>
      <img
        className="w-24 ml-4 mt-3"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <form action="" onSubmit={(e)=>submithandler(e)} className="flex flex-col   mt-2">
        <div className="ml-7 flex flex-col gap-2 mr-7">
          <h3 className="text-lg font-semibold"> What's your name</h3>
        <div className="flex   gap-2 w-full justify-between">
        <input
            className="outline-none w-1/2 rounded-md px-2 py-3 mb-5 bg-[#eeeeee]    border text-lg "
            type="text"
             value={firstname}
             onChange={(e)=>setfirstname(e.target.value)}
            placeholder="First name"
          />
        <input
            className="outline-none placeholder:text-base  w-1/2 rounded-md px-2 py-3 mb-5 bg-[#eeeeee]   border text-lg "
            type="text"
             value={lastname}
             onChange={(e)=>setlastname(e.target.value)}
            placeholder="Last name"
          />
        </div>
        </div>
        <div className="ml-7 flex flex-col gap-2">
          <h3 className="text-lg font-semibold"> What's your email</h3>
          <input
            className="outline-none rounded-md px-3 py-3 mb-5 bg-[#eeeeee] w-68 mr-6 border text-lg "
            type="email"
             value={email}
             onChange={(e)=>setemail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div className="ml-7 flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Enter Password</h3>
          <input
            className="outline-none rounded-md mb-5 px-3 py-3 bg-[#eeeeee] w-68 mr-6 border text-lg "
            type="text"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <button className="px-4 py-2   text-lg rounded-md bg-black text-white font-semibold m-4">
        Create a Account
        </button>
      </form>
      <p className="text-center text-[16px] font-semibold">
         Already have a account?
        <Link className="text-blue-600" to="/login">
          Login here
        </Link>
      </p>
    </div>
  
     <p className="text-xs font-semibold mb-6 ml-6 text-tight">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio provident omnis quidem nulla aspernatur totam, ducimus temporibus quae nihil, </p>
   
  </div>
  )
}

export default UserSignin