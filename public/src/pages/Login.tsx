import React,{FC,useState,useEffect} from "react"
import FormLayout from "@/components/layouts/FormLayout"
import InputForm from "@/components/fragments/InputForm"
import {Link,useNavigate} from "react-router-dom"
import {toastOption} from "@/config/react-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "@/config/axios"

interface ILogin {
  username: string
  password:string
}
const Login: FC = () => {
  const [input,setInput] = useState<ILogin>({
    username:"",
    password:""
  })
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(localStorage.getItem("chat-app")){
     navigate("/")
    }
  },[])
  
  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const {username,password}: ILogin = input
    try{
      const response = await axios.post("/api/user/auth/login",{
        username,password
        })
      localStorage.setItem("chat-app",JSON.stringify(response.data.data))
      navigate("/")
    }catch(err: any){
      toast(err.response.data.msg,toastOption)
    }
  }
  
 const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => { 
    const {value} = e.target
    const inputName = e.target.name
    setInput((current)=>{
      return {
        ...current,
        [inputName]:value
      }
    })
    
  }
  
  return (
    <div className="w-screen min-h-screen bg-hitamPudar flex justify-center items-start py-20 md:items-center">
      <ToastContainer/>
      <FormLayout submit={handleSubmit} title="ChatMe">
        <InputForm change={handleChange} name="username" type="teks" placeholder="Username"/>
        <InputForm name="password" change={handleChange} type="password" placeholder="********"/>
        <button type="submit" className="w-[90%] mt-5 md:mt-16 md:h-20 bg-unguBg md:text-3xl rounded h-10 flex items-center justify-center">LOGIN</button>
        <div className="font-sans text-sm text-putihTerang text-center">
          <p>Belum memliki akun? <Link to="/register" className="text-biru">Register</Link> terlebih dahulu</p>
        </div>
      </FormLayout>
    </div>
    )
}

export default Login