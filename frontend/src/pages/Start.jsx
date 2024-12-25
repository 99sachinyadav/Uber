import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import {useGSAP} from  '@gsap/react';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap'
import LoadingSearch from "../components/LoadingSearch";
import VehicalPannel from "../components/VehicalPannel";
import ConfirmRide from "../components/ConfirmRide";
import LookingforCaption from "../components/LookingforCaption";
import WatingForDriver from "../components/WatingForDriver";
// import { sendMessageToSocketId } from "../../../../backend/Socket/socket";
import { UserDataContext } from "../context/UserContext";
import { backendUrl } from "../App";
import { SocketContext } from "../context/Socketcontext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/Livetracking";
 
const Start = () => {

     const [pickup, setpickup] = useState([]);
      const [destination, setDestination] = useState([]);
        const [Activeflag,setActiveflag] = useState('')
       
      const [pannelOpen, setpannelOpen] = useState(false)
      const [vehicalpanel, setvehicalpanel] = useState(false)
       const [confirmride, setconfirmride] = useState(false)
       const [LookingCaption, setLookingCaption] = useState(false)
        const [WaitingDriver, setWaitingDriver] = useState(false)
         const [pickinput, setpickinput] = useState('');
            const [destinationinput, setdestinationinput] = useState('')
            const [fare, setfare] = useState({})
            const [vehicalType, setvehicalType] = useState('')
            const [myride,setmyride]=useState(null)
            const [image, setimage] = useState('')
           const pannelRef = useRef(null)
           const arroeRef = useRef(null)
           const  vehicalRef= useRef(null);
            const confirmRef= useRef(null);
             const  LookingRef=useRef(null);
             const WaitingRef=useRef(null);
        const navigate= useNavigate();
           //  console.log(pickinput,destinationinput)


   // const {user}= useContext(UserDataContext)
    const user=JSON.parse(localStorage.getItem("user"))
     const {socket} = useContext(SocketContext)
  useEffect(()=>{
  //  console.log("myuser",user)
    socket.emit("join",{userType:"user",userId:user._id})
  },[user])    
  
  
  socket.on('ride-confirmed', ride=>{
    console.log(ride)
    setmyride(ride)
     setWaitingDriver(true)
     setLookingCaption(false)
  })


  socket.on('ride-started',ride=>{
    setWaitingDriver(false);
    console.log("myride", ride)
    navigate('/riding', {state:{ride:ride}})
  })
 
      const createRide = async()=>{
         try {
           const responce = await axios.post(backendUrl+"/api/ride/getride",{
            vehicalType:vehicalType,
            pickup:pickinput,
            destination:destinationinput,
           },{
             headers:{
                Authorization:`bearer ${localStorage.getItem('token')}`
             }
           }) 
           console.log(responce)
         } catch (error) {
          console.log(error)
         }
      }
     const submitHandler = async (e)=>{
        e.preventDefaulte();

     }

     const getfare = async()=>{
      setvehicalpanel(true),
      setpannelOpen(false)
       try {
         const responce = await axios.get(backendUrl+"/api/ride/genfare",{
          params:{pickinput:pickinput,destinationinput:destinationinput},
             headers:{
               Authorization:`bearer ${localStorage.getItem('token')}`
             }
        
         })
        // console.log(responce.data.fare)
        setfare(responce.data.fare)
       } catch (error) {
          console.log(error)
       }
     }

     const pickupchangehandler = async (e)=>{
      setpickinput(e.target.value)
      const responce = await axios.get(backendUrl+"/api/map/get-suggestions",{
               
        params:{input:e.target.value},
         headers:{
          Authorization:`bearer ${localStorage.getItem('token')}`
         }
        })
         
        console.log(responce.data.responce)
        if(responce.status===200 && responce.data.responce.length>0){
         setpickup(responce.data.responce)
        }

        console.log('myresponce',pickup)
     }
     // console.log(WaitingDriver)
     const destinatonchangehandler = async (e)=>{
      setdestinationinput(e.target.value)
      const responce = await axios.get(backendUrl+"/api/map/get-suggestions",{
               
        params:{input:e.target.value},
         headers:{
          Authorization:`bearer ${localStorage.getItem('token')}`
         }
        })
         
        //console.log(responce.data.responce)
        if(responce.status===200 && responce.data.responce.length>0){
          setDestination(responce.data.responce)
        }

       // console.log('myresponce',destination)
     }
     // console.log(WaitingDriver)
       
//AlzaSy6klDXkOcj5Y-o6Ngt4rC0mGJD_VoUeLrK
     useGSAP(()=>{
     if(pannelOpen){
      gsap.to(pannelRef.current,{
       height:'72%',
       padding:'24px'
       })
       gsap.to(arroeRef.current,{
        opacity:1
       })
     }
     else{
      gsap.to(pannelRef.current,{
       height:'0%',
       padding:0
      })
      gsap.to(arroeRef.current,{
        opacity:0
       })
     }
     },[pannelOpen])

     useGSAP(()=>{
        if(vehicalpanel){
          gsap.to(vehicalRef.current,{
            transform:'translate(0%)'
           })
          
        }
        else{
          
        gsap.to(vehicalRef.current,{
          transform:'translate(100%)'
         })
        }
     },[vehicalpanel])

     
     useGSAP(()=>{
        if(confirmride){
          gsap.to(confirmRef.current,{
            transform:'translate(0%)'
           })
        }
        else{
        gsap.to(confirmRef.current,{
          transform:'translate(100%)'
         })
        }
     },[confirmride])

     useGSAP(()=>{
        if(LookingCaption){
          gsap.to(LookingRef.current,{
            transform:'translate(0%)'
           })
        }
        else{
        gsap.to(LookingRef.current,{
          transform:'translate(100%)'
         })
        }
     },[LookingCaption])

     useGSAP(()=>{
        if(WaitingDriver){
          gsap.to(WaitingRef.current,{
            transform:'translate(0%)'
           })
        }
        else{
        gsap.to(WaitingRef.current,{
          transform:'translate(100%)'
         })
        }
     },[LookingCaption])
                                                               
  return (
    <div className="w-full h-screen relative overflow-hidden ">
      <img
        className="w-24  absolute left-5 top-3"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <div className="h-[70%] w-full">
      <LiveTracking  />
      </div>

      <div className=" flex flex-col   justify-end  absolute  h-screen  top-0  w-full ">
       <div className="h-[28%] bg-white p-3 pb-4 px-2  rounded-2xl relative ">
       <h1 className="ml-3 text-2xl  mb-4 font-semibold ">Find a trip</h1>
       <i ref={arroeRef} onClick={()=>setpannelOpen(false)} className="ri-arrow-down-s-line absolute right-5 top-5 text-3xl"></i>
        <form onSubmit={(e)=>submitHandler(e)} className=" px-3">
          <div className="absolute w-1 h-16 rounded-b-3xl bg-black top-[80px] left-8"></div>
          <input onClick={()=>{setpannelOpen(true),setActiveflag('pickinput')}} value={pickinput}  onChange={(e)=>{pickupchangehandler(e)}} className="w-full px-6 py-3 rounded-md border-none mb-3 bg-[#eee] outline-purple-600 placeholder:text-lg" type="text" placeholder="Add a pick-up location" />
          <input  onClick={()=>{setpannelOpen(true),setActiveflag('destinationinput') }} value={destinationinput}  onChange={(e)=>{destinatonchangehandler(e)}} className="w-full px-6 py-3 rounded-md border-none mb-3 bg-[#eee] outline-purple-600 placeholder:text-lg" type="text" placeholder="Enter your destination" />
        </form>
            
       </div>
       <div ref={pannelRef} className="h-0   bg-white   block overflow-y-auto  ">
       <button  onClick={getfare} className="mt-0  w-80 mb-3 py-2 rounded-lg font-semibold text-lg text-white bg-black">Find Trip</button>
          <LoadingSearch 
          pickup={pickup}
          destination={destination}
                Activeflag={Activeflag}
                setActiveflag={setActiveflag}
            setpannelOpen={setpannelOpen}  
            vehicalpanel={vehicalpanel} 
            setpickinput={setpickinput}
            pickinput={pickinput}
            destinationinput={setdestinationinput}
            setdestinationinput={setdestinationinput}
            setvehicalpanel={setvehicalpanel}/>
       </div>
      </div>

      <div  ref={vehicalRef} className=" fixed flex  rounded-3xl pb-8 flex-col w-full z-10 bottom-0 p-3 translate-y-full bg-white">
    <VehicalPannel fare={fare} setimage={setimage} setvehicalType={setvehicalType} setconfirmride={setconfirmride} setvehicalpanel={setvehicalpanel}/>
      </div>
      <div  ref={confirmRef} className=" fixed flex  rounded-3xl pb-6 flex-col w-full z-10 bottom-0 p-3 translate-y-full bg-white">
  
         <ConfirmRide   createRide={createRide} image={image} pickinput={pickinput} destinationinput={destinationinput} fare={fare} vehicalType={vehicalType} setconfirmride={setconfirmride} setLookingCaption={setLookingCaption}  />
      </div>
      <div  ref={LookingRef} className=" fixed flex  rounded-3xl pb-6 flex-col w-full z-10 bottom-0 p-3 translate-y-full bg-white">
  
     <LookingforCaption  image={image} pickinput={pickinput} destinationinput={destinationinput} fare={fare} vehicalType={vehicalType} setLookingCaption={setLookingCaption}/>
      </div>
      <div ref={WaitingRef}  className=" fixed flex  rounded-3xl  pb-6 flex-col w-full translate-y-full z-10 bottom-0 p-3  bg-white">
    <WatingForDriver image={image} myride={myride} setWaitingDriver={setWaitingDriver}/>
 
      </div>
      
    </div>
  );
};

export default Start;
