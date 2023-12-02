import React,{useEffect,useState,useRef} from 'react'
import ChatInput from "@/components/fragments/ChatInput"
import ChatView from "@/components/fragments/ChatView"
import BubbleChat from "@/components/fragments/BubbleChat"
import axios from "@/config/axios"
import {useParams,useNavigate} from "react-router-dom"
import socket from "@/config/socket"
import {DataUser,ICurrentUser,IMessage} from "@/types/userType"
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react'
const Chat:React.FC = () => {
  const [isShowEmoji,setIsShowEmoji] = useState<boolean>(false)
  const [input,setInput] = useState<string>("")
  const [currentUser,setCurrentUser]=useState<ICurrentUser>({
    _id: "",
    avatarImage: "",
    username: "",
    isAvatarImageSet: false,
    password : ""
  })
  const [currentChat, setCurrentChat] = useState<DataUser>({
    _id:"",
    username:"",
    avatarImage:""
  })
  const [message,setMessage] = useState<IMessage[]>([])
  const [arivalMessage,setArivalMessage] = useState<IMessage>({
    fromSelf:false,
    message:""
  })
  
  const {id} = useParams()
  const navigate = useNavigate()
  
  useEffect(()=>{
    getCurrentChatUser()
  },[id])
  
  const scrollRef = useRef<HTMLElement>()
  
  useEffect(() => {
    if(scrollRef.current){
      console.log("masuk")
      scrollRef.current.scrollIntoView({
      behavior:'smooth'
    })
    }
  },[message])
  
  useEffect(()=>{
    const user = localStorage.getItem("chat-app")
    if(user){
      setCurrentUser(JSON.parse(user))
    }else{
      navigate("/login")
    }
  },[])
  
  useEffect(()=>{
    if(currentUser._id && currentChat._id){
      getMessage()
    }
  },[currentUser,currentChat])
  
  useEffect(()=>{
    socket.on("msg-recieve",(message: string)=>{
    setArivalMessage({
      fromSelf:false,
      message
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
  
  const handleEmojiClick = ({emoji}:any) => {
    setInput(currentInput=>currentInput+emoji)
  }
  
  
  const sendMessage = async():Promise<void> => {
    try{
     await axios.post("api/message/send",{
        from:currentUser._id,
        to:currentChat._id,
        message:input
      })
    socket.emit("send-msg",{
      from:currentUser._id,
      to:currentChat._id,
      message:input
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
       return <BubbleChat scrollRef={scrollRef} data={element} key={index}/>
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
        theme={Theme.DARK}
        searchDisabled={true}
      />
      }
    </div>
    </div>
  )
}

export default Chat