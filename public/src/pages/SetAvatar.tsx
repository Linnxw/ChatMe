import React,{useState,useEffect} from "react"
import Container from "@/components/fragments/Container"
import Avatar from "@/components/fragments/Avatar"
import Loader from "@/components/fragments/Loader"
import {useNavigate} from "react-router-dom"
import {Buffer} from "buffer"
import axios from "axios"
import {toastOption} from "@/config/react-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SetAvatar:React.FC = () =>{
  const [avatars,setAvatars] = useState<string[]>([])
  const [avatarSelect,setAvatarSelect] = useState<undefined | number>(undefined)
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const apiAvatar = 'https://api.multiavatar.com/45678945'
  const navigate = useNavigate()
  
  useEffect(()=>{
    setPictureAvatars()
  },[])
  
  const setPictureAvatars = async() =>{
    const data: string[] = []
    try{
      for(let i = 0 ; i < 4 ; i++ ){
      const image = await axios.get(`${apiAvatar}/${Math.round(Math.random() * 1000)}`)
      const buffer = new Buffer(image.data)
      data.push(buffer.toString('base64'))
    }
    setAvatars(data)
    setIsLoading(false)
    }catch(err: any){
      setIsLoading(false)
      console.log("test")
      toast("Someting went worng,please refresh page",toastOption)
    }
  }
  
  const selectAvatar = (index:number) =>{
    setAvatarSelect(index)
  }
  
  const addAvatar = async () =>{
    try{
     if(!avatarSelect){
      toast("Please chose your avatar!")
    }else{
      const user = JSON.parse(localStorage.getItem("chat-app")!)
      const avatarImage: string = avatars[avatarSelect]
      const {data} = await axios.post("http://localhost:9090/api/user/auth/setavatar/"+user._id,{
        avatarImage
        })
      user.avatarImage = data.avatarImage
      user.isAvatarImageSet = true
      localStorage.setItem("chat-app",JSON.stringify(user))
      navigate("/")
    }
    }catch(err: any){
      console.log(err)
    }
  }
  return (
    <Container align="items-center">
    {
      isLoading ? <Loader/> : avatars.length < 1 ? <ToastContainer/> :
      <div className="w-[90%] p-2 gap-4 flex flex-wrap justify-center">
      <div className="py-5">
        <h1 className="text-center font-sans font-semibold text-putihTerang text-xl">Pick an avatar as your profile picture</h1>
      </div>
        {
        avatars.map((element,index)=>(
          <Avatar
          width="w-32"
          height="h-32"
          base64={element}
          onClick = {selectAvatar}
          key={index}
          index= {index}
          selected={avatarSelect}
          />
          )
        )
        }
        <button onClick={addAvatar} type="submit" className="w-[90%] mt-5 md:mt-16 text-putihTerang md:h-20 bg-unguBg md:text-3xl rounded h-10 flex items-center justify-center">Set Avatar</button>
      </div>
    }
    </Container>
    )
}

export default SetAvatar