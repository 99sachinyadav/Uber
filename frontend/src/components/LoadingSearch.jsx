import { useEffect, useState } from "react"

// Activeflag={Activeflag}
// setActiveflag={setActiveflag}
// setpannelOpen={setpannelOpen}  
// vehicalpanel={vehicalpanel} 
// setpickinput={setpickinput}
// pickinput={pickinput}
// destinationinput={setdestinationinput}
// setdestinationinput={setdestinationinput}
// setvehicalpanel={setvehicalpanel}/>

const LoadingSearch = ({setvehicalpanel,setpannelOpen, Activeflag,setpickinput,pickinput,destinationinput,setdestinationinput,pickup,destination}) => {
       //    console.log(pickup,destination,pickflag,destinationflag)

  const [mysuggestion, setmysuggestion] = useState([])
   
    useEffect(()=>{
      if(Activeflag==='pickinput'){
        // console.log("mypickup",pickup)
         setmysuggestion(pickup);
      
        }
        else if(Activeflag==='destinationinput'){
         setmysuggestion(destination);
    
         
        }
    },[pickup, destination,Activeflag])
  // const location =[
  //   "24B, Near Kapoor's cafe, Rajiv coloy mohan Nagar Ghaziabad",
  //   "24B, Near singhania's cafe, Rajiv coloy mohan Nagar Ghaziabad",
  //   "24B, Near Sharmas's cafe, Rajiv coloy mohan Nagar Ghaziabad",
  //   "24B, Near Rohit's cafe, Rajiv coloy mohan Nagar Ghaziabad",
  //   "24B, Near sahil's cafe, Rajiv coloy mohan Nagar Ghaziabad",
  // ]

  // if(pickflag && pickup){
  //   console.log("mypickup",pickup)
  //    setmysuggestion(pickup);
  //  }
  //  else if(destinationflag){
  //   setmysuggestion(destination);
  //  }
  const inputhandler = (item)=>{
    if(Activeflag==='pickinput'){
     // console.log("mypickup",pickup)
    
      setpickinput(item.description)
     }
     else if(Activeflag==='destinationinput'){
 
    setdestinationinput(item.description)
      
     }
   }
  return (
    <div>
        {/* this is a sample data */}
          
       
       
       { mysuggestion.map((item,index)=>{
        return ( <div key={index}  onClick={()=>{inputhandler(item)}} className="flex gap-2 my-3 p-2 border-2 items-center border-gray-400 active:border-black  rounded-lg  ">
          <h2 className="h-8  flex items-center justify-center bg-slate-300 w-8 rounded-full"><i className="ri-map-pin-fill"></i></h2>
          <h4 className="font-medium text-[17px]">{item.description}</h4>
        </div>)
       })}
      

    </div>
  )
}

export default LoadingSearch