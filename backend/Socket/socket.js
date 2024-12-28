import { Server } from "socket.io";
import { User } from "../model/user.model.js";
import { Caption } from "../model/caption.model.js";

let io;

const initializeSocket = async (server)=>{
      io = new Server(server,{
        cors:{
            origin:'*',
            methods:['GET','Post']
        }
      })

      io.on('connection',(socket)=>{
      //  console.log(`Client is connected with id ${socket.id}` );

            
          socket.on('join', async (data)=>{
           const {userType,userId}=data;
              
           console.log(`user ${userId} join as ${userType}`)
               if(userType==='user'){
             // console.log(socket.id)
            const user=   await  User.findByIdAndUpdate(userId,
              {socketId:socket.id})
               console.log(user)
               }
               else if(userType==='caption'){
                //console.log(socket.id)
              const user=   await Caption.findByIdAndUpdate(userId,{
                  socketId:socket.id
                })
         //    console.log(user)
               }
          })
//****************************************************************************************************** */
          socket.on('update-location-caption',async(data)=>{
            const {userId,location}=data;
            if(!location||!location.ltd||!location.lng){
              return socket.emit('error',{message:'Invalid location data'})
            }

            await Caption.findByIdAndUpdate(userId,{location:{
              ltd:location.ltd,
              lng:location.lng
            }})

          })


          socket.on('disconnect',()=>{
            console.log(`Client is disconnected with id ${socket.id}`)
          })
      })    
}

const sendMessageToSocketId = async(socketId,messageObject)=>{
     
  if(io){
    io.to(socketId).emit(messageObject.event,messageObject.data)
  }
  else{
    console.log('socket is not initalized yet')
  }

}

export {initializeSocket ,sendMessageToSocketId}