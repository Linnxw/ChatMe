import React,{FC,useState,useEffect} from "react"
import FormLayout from "@/components/layouts/FormLayout"
import InputForm from "@/components/fragments/InputForm"
import {Link,useNavigate} from "react-router-dom"
import {IRegister} from "@/types/userType"
import {toastOption} from "@/config/react-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "@/config/axios"

const Register: FC = () => {
  const [input,setInput] = useState<IRegister>({
    username:"",
    email: "",
    password: "",
    confPassword: ""
  })
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(localStorage.getItem("chat-app")){
     navigate("/")
    }
  },[])
  
  const formValidation = (): boolean =>{
   const {username,email,password,confPassword} = input

   if(password !== confPassword){
     toast("Password and Confirm password must be same",toastOption)
     return false
   }
   if(username.length < 3){
     toast("Username must be greather than 3 carachter",toastOption)
     return false
   }
   if(email.length < 3){
     toast("Email must be greather than 3 carachter",toastOption)
     return false
   }
  return true
  }
  
  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const {username,email,password}:IRegister = input
    if(formValidation()){
      try{
       const response = await axios.post("/api/user/auth/register",{
        username,email,password
      })
      if(response.status === 201){
        localStorage.setItem("chat-app",JSON.stringify(response.data.data))
        navigate("/")
      }
      }catch(err:any){
        console.log(err)
        if(err.response){
          toast(err.response.data.msg,toastOption)
        }
      }
     
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
      <FormLayout title="ChatMe" submit={handleSubmit}>
        <InputForm change={handleChange} name="username" type="teks" placeholder="Username"/>
        <InputForm change={handleChange} name="email" type="email" placeholder="Email"/>
        <InputForm change={handleChange} name="password" type="password" placeholder="********"/>
        <InputForm change={handleChange} name="confPassword" type="password" placeholder="********"/>
        <button type="submit" className="w-[90%] mt-5 md:mt-16 md:h-20 bg-unguBg md:text-3xl rounded h-10 flex items-center justify-center">REGISTER</button>
        <div className="font-sans text-sm text-putihTerang text-center">
          <p>Sudah memliki akun? <Link to="/login" className="text-biru md:text-2xl">Login</Link> untuk melanjutkan</p>
        </div>
      </FormLayout>
    </div>
    )
}

export default Register