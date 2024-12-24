import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const CaptionProtect = ({children}) => {
      const navigate= useNavigate();
    const captionToken = localStorage.getItem('captionToken');

   useEffect(()=>{
    if(!captionToken){
        navigate('/caption-login');
    }
   },[captionToken])

  return (
   <>
    {children}
   </>
    
  )
}

export default CaptionProtect