import axios from "axios";
import { useNavigate } from "react-router-dom";

 

export const UserLogout = () => {

const navigate=useNavigate();
const token= localStorage.getItem('token');

 const logOut =async()=>{
    try {
         const responce = await axios.get('http://localhost:5000/api/user/logout',{
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
