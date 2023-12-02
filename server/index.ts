import express,{Application} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from"cors"
import {IMessage} from "./types//userType"
import { userRouter, messageRouter } from"./routes"
import { Server,Socket } from "socket.io"
import http from "http"
dotenv.config

const app:Application = express()
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:process.env.ORIGIN_SOCKET_IO,
    credentials:true
  }
})

const onlineUsers:any = new Map()
io.on("connection",(socket: Socket)=>{
  socket.on("add-user",(userId: string)=>{
    onlineUsers.set(userId,socket.id)
  })
  socket.on("send-msg",(data: IMessage)=>{
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve",data.message)
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

app.get("/",(req:express.Request,res:express.Response)=>{
  res.status(200).json({
    status:true,
    msg:"succes conect api"
  })
})
app.use("/api/user/",userRouter)
app.use("/api/message/",messageRouter)


server.listen(process.env.PORT,()=>{
  console.log("Server runing in Port:"+ process.env.PORT)
})

