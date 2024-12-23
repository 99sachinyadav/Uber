import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
 

export const UserLogout = () => {

const navigate=useNavigate();
const token= localStorage.getItem('token');

 const logOut =async()=>{
    try {
         const responce = await axios.get(backendUrl+'/api/user/logout',{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
       if(responce.status===200){
        localStorage.removeItem('token')
        navigate('/login')
       }
        //  console.log(responce)
    } catch (error) {
         console.log(error)
    }
 }

  return (
    <div onClick={logOut}>UserLogout</div>
  )
}
