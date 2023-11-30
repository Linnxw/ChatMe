import {Request,Response} from "express"
import Users from "../models/userModel"
import {IRegister,IUserLogin} from "../types/userType"
import passwordHash from "password-hash"
import {checkUsername} from "../services/userService"
const registerUser = async (req:Request,res:Response) =>{
  const {email,username,password}:IRegister= req.body
  const userCheck = await Users.findOne({username})
  const emailCheck = await Users.findOne({email})
  if(userCheck) return res.status(400).json({status:false,msg:"Username is already used"})
  if(emailCheck) return res.status(400).json({status:false,msg:"Email is already used"})
  const hashPassword = passwordHash.generate(password)
  const user = await Users.create({
    username:username.toLowerCase(),
    email,
    password:hashPassword
  })
  user.password = ""
  res.status(201).json({status:true,data:user,msg:"Register successfully!"})
}

const loginUser = async (req:Request,res:Response) => {
  const {username,password}: IUserLogin = req.body
  try{
    const isUsernameRegistered :any = await checkUsername(username.toLowerCase())
    if(!isUsernameRegistered) 
    return res.status(400).json({status:false,msg:"Username not registered"})
    const checkPassword:boolean = passwordHash.verify(password,isUsernameRegistered.password)
    if(!checkPassword)
    return res.status(400).json({status:false,msg:"invalid password"})
    isUsernameRegistered.password = ""
    res.status(200).json({status:true,data:isUsernameRegistered,msg:"login successfully"})
  }catch(err:any){
    console.log(err)
  }
  
}

const setAvatarImage = async (req:Request,res:Response)=>{
  try{
  const {avatarImage} = req.body
  const {id} = req.params
  const user = await Users.findByIdAndUpdate(id,{
    isAvatarImageSet:true,
    avatarImage
    })
  if(!user)
    return res.sendStatus(401)
  return res.status(200).json({isSet:user.isAvatarImageSet,avatarImage:user.avatarImage})
  }catch(err:any){
    res.status(500).json({msg:err.message})
    console.log(err)
  }
}


const getAllUser = async (req:Request,res:Response) => {
  const id = req.params.id!
  try{
    const users = await Users.find({_id:{$ne:id}}).select([
      "username","avatarImage","_id"
      ])
    res.status(200).json({status:true,data:users,msg:"get all users"})
  }catch(err: any){
    res.status(500).json({msg:err.message})
  }
}

const getUserById = async (req:Request,res:Response) => {
  try{
    const user = await Users.findOne({_id:req.params.id!}).select(["_id","username","avatarImage"])
    res.status(200).json({status:true,user,msg:"succes get user by id: "+req.params.id})
  }catch(err: any){
    console.log(err.message)
  }
}
export {registerUser,loginUser,setAvatarImage,getAllUser,getUserById}