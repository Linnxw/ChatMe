import Users from "../models/userModel"

export const checkUsername = async (username:string) =>{

  const user = await Users.findOne({username})
  .then((data)=>{
    return data
  })
  .catch((err:any)=>{
    console.log(err)
    return false
  })
  return user
}