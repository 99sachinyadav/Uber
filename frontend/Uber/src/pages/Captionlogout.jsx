import axios from "axios"
import { useNavigate } from "react-router-dom";



const Captionlogout = () => {
      const navigate= useNavigate();
     const Logout = async ()=>{
        try {
        
             const captionToken = localStorage.getItem('captionToken');
                   //   console.log(captionToken)
                      const responce = await axios.get('http://localhost:5000/api/caption/logout',{
                         headers:{
                             Authorization: `Bearer ${captionToken}`
                         }
                      })
            console.log(responce)
            if(responce.request.status==200){
                  localStorage.removeItem('captionToken');
                  navigate('/caption-login');
            }
            
        } catch (error) {
            console.log(error)
        }
     }
  return (
    <div onClick={Logout}>Captionlogout</div>
  )
}

export default Captionlogout