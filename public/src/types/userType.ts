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