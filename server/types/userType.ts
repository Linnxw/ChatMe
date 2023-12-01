import {Types} from "mongoose"
export interface IRegister {
  username: string
  email: string 
  password: string
}

export interface IUserLogin {
  username: string 
  password: string
}

export interface IUserSchema {
  username: string
  email: string
  password: string
  isAvatarImageSet:boolean 
  avatarImage:string
}

export interface IMessage {
  from: string
  to: string
  message: string
}

export interface IMessageModel {
  message:{
    text:string
  }
  users:any
  sender:Types.ObjectId
}