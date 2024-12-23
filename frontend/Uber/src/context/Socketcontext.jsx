import  { createContext, useEffect } from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:5000');

export const SocketContext = createContext();
const Socketcontext = ({children}) => {
 

  useEffect(()=>{
      socket.on('connect',()=>{
        console.log("conneccted to server");
      })
      socket.on('disconnect',()=>{
        console.log('disconnected to  server')
      })


  },[])

  



  return (
   <SocketContext.Provider value={{socket}}>
    {children}
   </SocketContext.Provider>
  )
}

export  default Socketcontext 
