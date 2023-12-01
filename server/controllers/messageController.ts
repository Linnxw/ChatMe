import {Request,Response} from "express"
import Message from "../models/messageModel"
import {IMessage} from "../types/userType"
export const getAllMessage = async (req:Request,res:Response)=>{
  const {from,to} = req.body
  try{
    const message = await Message.find({
      users:{$all:[from,to]}
    }).sort({updatedAt:1})
    const projectMessage = message.map((message:any)=>{
      return {
        fromSelf:message.sender.toString() === from,
        message:message.message.text
      }
    })
    res.status(200).json({status:true,projectMessage,msg:"succes get nessage"})
  }catch(err:any){
    console.log(err)
    res.status(500).json({msg:err.message})
  }
}
export const sendMessage = async (req:Request,res:Response)=>{
  const {from,to,message}: IMessage = req.body
  try{
    const createMessage = await Message.create({
      message:{
        text:message
      },
      users:[from,to],
      sender:from
    })
  
    res.status(200).json(
      {
        status:true,
        message:"succes send message"
      }
      )
  }catch(err: any){
    res.status(500).json({msg:err.message})
    console.log(err.message)
  }
}