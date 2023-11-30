import mongoose from "mongoose"
import {IUserSchema} from "../types/userType"
const userSchema = new mongoose.Schema<IUserSchema>({
  username:{
    type:String,
    required:true,
    unique:true,
    min:3,
    max:30,
    sparse:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    max:50
  },
  password:{
    type:String,
    required:true,
  },
  isAvatarImageSet:{
    type:Boolean,
    default:false
  },
  avatarImage:{
    type:String,
    default:""
  }
})

export default mongoose.model("Users",userSchema)