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