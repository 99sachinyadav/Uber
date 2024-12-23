import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptionDataContext } from "../context/captionContext";

 

const Captionlogin = () => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const { createdCaption, setcaption } = useContext(CaptionDataContext);
    const navigate = useNavigate();
    const submithandler =  async (e)=>{
         e.preventDefault()
         const caption =  {
            email:email,
            password:password,
        }

        const responce= await  axios.post('http://localhost:5000/api/caption/login', caption)
        console.log(responce);
        if(responce.status==201){
          setcaption(responce.data.caption);
          // console.log(responce.data.captionToken)
          localStorage.setItem('caption',JSON.stringify(responce.data.caption))
           localStorage.setItem('captionToken',responce.data.captionToken)
        
           navigate('/captionstart');
         console.log(caption);
   
        }
        
         setemail('')
         setpassword('')
        //  console.log(createdCaption)
    }
    
  return (
    <div className="w-full h-screen flex flex-col justify-between ">
    <div>
      <img
        className="w-24 ml-4 mt-3"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <form action="" onSubmit={(e)=>submithandler(e)} className="flex flex-col   mt-8">
        <div className="ml-7 flex flex-col gap-2">
          <h3 className="text-lg font-semibold">What's your email</h3>
          <input
            className="outline-none rounded-md px-3 py-3 mb-7 bg-[#eeeeee] w-68 mr-6 border text-lg "
            type="email"
             value={email}
             onChange={(e)=>setemail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div className="ml-7 flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Enter Password</h3>
          <input
            className="outline-none rounded-md mb-7 px-3 py-3 bg-[#eeeeee] w-68 mr-6 border text-lg "
            type="text"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <button className="px-4 py-2   text-lg rounded-md bg-black text-white font-semibold m-4">
          Login
        </button>
      </form>
      <p className="text-center text-lg font-semibold">
        Join a fleet?
        <Link className="text-blue-600" to="/caption-signin">
          Register as a caption
        </Link>
      </p>
    </div>
  
      <Link
          to='/login'
       className="px-4 py-3  m-6 w-80 flex items-center justify-center mb-14 text-lg rounded-md bg-orange-500 text-white font-semibold ">
        Sign in as User
      </Link>
   
  </div>
  )
}

export default Captionlogin