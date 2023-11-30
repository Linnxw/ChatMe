import React,{useState,useEffect,useRef} from "react"
import {useNavigate} from "react-router-dom"
import Container from "@/components/fragments/Container"
import Contact from "@/components/fragments/Contact"
import axios from "@/config/axios"
import socket from "@/config/socket"
type UserChat = {
  _id: string
  avatarImage: string
  username: string 
}[]

type CurrentUser = {
  _id: string
  avatarImage: string
  username: string 
  isAvatarImageSet: boolean
  password : ""
}
const Chats:React.FC = () => {
  const [chats, setChats] = useState<UserChat>([])
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    _id: "",
    avatarImage: "",
    username: "" ,
    isAvatarImageSet: false,
    password : ""
  })
  
  const navigate = useNavigate()
  useEffect(() => {
   if(!localStorage.getItem("chat-app")){
     navigate("/")
   }else{
     const user = JSON.parse(localStorage.getItem("chat-app")!)
     setCurrentUser(user)
   }
  }, [])
  
  
  
  useEffect(()=>{
    if(currentUser._id){
  
      socket.emit("add-user",currentUser._id)
      getAllUser()
    }
  },[currentUser])
  
  const getAllUser = async():Promise<void> =>{
    try{
      const {data:{data}} = await axios.get("/api/user/all/"+currentUser._id)
      setChats(data)
    }catch(err: any){
      console.log(err)
    }
  }
  return (
    <Container 
    className="text-putihTerang flex-col" 
    align="items-start"
    justify="start"
    paddingY="py-2">
      <section>
        <h1 className=" text-center text-3xl md:text-5xl font-sans">ChatMe</h1>
      </section>
      <section className="w-screen flex flex-col p-4 gap-2">
      {
        chats?.map((element:any,index:number)=>{
          return <Contact key={element._id + index*5} data={element}/>
        })
      }
      </section>
    </Container>
    )
}

export default Chats
