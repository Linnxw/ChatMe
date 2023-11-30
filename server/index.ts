import express,{Application} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import {userRouter,messageRouter} from "./routes"
import {Server,Socket} from "socket.io"
import http from "http"
dotenv.config()


const app:Application = express()
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173"
  }
})

const onlineUsers:any = new Map()
io.on("connection",(socket: Socket)=>{
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id)
  })
  socket.on("send-msg",(data)=>{
    const sendUserSocket = onlineUsers.get(data.to)
    console.log("online",onlineUsers)
    console.log("luar",sendUserSocket)
    if(sendUserSocket){
      console.log("masuk",sendUserSocket)
      socket.to(sendUserSocket).emit("msg-recieve",data.msg)
    }
  })
})
app.use(express.json())
app.use(cors({
  credentials:true
}))
mongoose.connect(process.env.DB!)
.then(()=>{
  console.log("Mongodb connect!")
}).catch((err)=>{
  console.log("mongoodb disconect",err)
})

app.use("/api/user/",userRouter)
app.use("/api/message/",messageRouter)


server.listen(process.env.PORT,()=>{
  console.log("Server runing in Port:"+ process.env.PORT)
})


// const io = new Server(9000);
// const onlineUser: any = new Map()
// 
// io.on('connection',(socket: Socket)=>{
//   console.log("socket conected")
//   const chatSocket: any = socket
//   socket.on("add-user",(userId:string)=>{
//     onlineUser.set(userId,socket.id)
//   })
//   
//   socket.on("send-msg",(data:any)=>{
//     const sendUserSocket = onlineUser.get(data.to)
//     if(sendUserSocket){
//       socket.to(sendUserSocket).emit("msg-recieve",data.msg)
//     }
//   })
// })
// 