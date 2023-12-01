import mongoose from "mongoose"
import {IMessageModel} from "../types/userType"
const messageSchema = new  mongoose.Schema<IMessageModel>({
  message:{
    text:{
      type:String,
      required:true
    }
  },
  users:Array,
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{timestamps:true})

export default mongoose.model('Messages',messageSchema)