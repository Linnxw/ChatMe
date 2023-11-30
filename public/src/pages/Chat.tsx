import React,{useEffect,useState,useRef} from 'react'
import Container from "@/components/fragments/Container"
import Contact from "@/components/fragments/Contact"
import ChatInput from "@/components/fragments/ChatInput"
import ChatView from "@/components/fragments/ChatView"
import BubbleChat from "@/components/fragments/BubbleChat"
import axios from "@/config/axios"
import {useParams} from "react-router-dom"
import socket from "@/config/socket"
import {DataUser} from "@/types/userTypes"
import EmojiPicker from 'emoji-picker-react';
const Chat:React.FC = () => {
  const [isShowEmoji,setIsShowEmoji] = useState<boolean>(false)
  const [input,setInput] = useState<string>("")
  const [currentUser,setCurrentUser]=useState<any>({})
  const [currentChat, setCurrentChat] = useState<DataUser>({
    _id:"",
    username:"",
    avatarImage:""
  })
  const [message,setMessage] = useState<any>([])
  const [arivalMessage,setArivalMessage] = useState<any>({})
  const {id} = useParams()
  
  useEffect(()=>{
    getCurrentChatUser()
  },[id])
  
  useEffect(()=>{
    const user = localStorage.getItem("chat-app")
    setCurrentUser(JSON.parse(user))
  
  },[])
  
  useEffect(()=>{
    if(currentUser._id && currentChat._id){
      getMessage()
    }
  },[currentUser,currentChat])
  
  useEffect(()=>{
    socket.on("msg-recieve",(msg)=>{
    setArivalMessage({
      fromSelf:false,
      message:msg
    })
    })
  },[socket])
  
  useEffect(()=>{
    setMessage((prev:any)=>{
      return [
        ...prev,
        arivalMessage
        ]
    })
  },[arivalMessage])
  
  const getMessage = async() => {
    try{
      const {data} = await axios.post("api/message/getAll",{from:currentUser._id,to:currentChat._id})
      setMessage(data.projectMessage)
    }catch(err:any){
      console.log(err)
    }
  }
  const getCurrentChatUser = async() => {
    try{
      const {data:{user}} = await axios.get(`api/user/${id}`)
      setCurrentChat(user)
    }catch(err:any){
      console.log(err)
    }
  }
  
  const handleEmojiClick = ({emoji}) => {
    setInput(currentInput=>currentInput+emoji)
  }
  
  
  const sendMessage = async():Promise<void> => {
    try{
     const response = await axios.post("api/message/send",{
        from:currentUser._id,
        to:currentChat._id,
        message:input
      })
    socket.emit("send-msg",{
      from:currentUser._id,
      to:currentChat._id,
      msg:input
    })
    const msgs = [...message]
    msgs.push({
      fromSelf:true,
      message:input
    })
  
    setMessage(msgs)
    setInput("")
    }catch(err:any){
      console.log(err)
    }
  }
  return (
    <div className="flex-col scrollFill flex justify-start text-putihTerang h-[100svh] font-sans bg-hitamPekat">
   <ChatView.Header currentChat={currentChat}/>
   <ChatView.Container>
      {
     message?.map((element:any,index:number)=>{
       return <BubbleChat data={element} key={index}/>
     })
     }
   </ChatView.Container>
    <div className="absolute bottom-0">
      <ChatInput
      onChange={(e)=>setInput(e.target.value)}
      value={input}
      setIsShowEmoji={()=>setIsShowEmoji(!isShowEmoji)}
      sendMessage={sendMessage}/>
      {
        isShowEmoji && 
        <EmojiPicker
        onEmojiClick={handleEmojiClick}
        theme='dark'
        searchDisabled={true}
      />
      }
    </div>
    </div>
  )
}

export default Chat