export interface IRegister {
  username: string
  email: string
  password: string
  confPassword?: string
}

export type DataUser = {
  avatarImage:string
  username: string 
  _id: string
}

export interface ICurrentUser {
  _id: string
  avatarImage: string
  username: string 
  isAvatarImageSet: boolean
  password : ""
}

export interface IMessage {
  fromSelf: boolean
  message: string
}