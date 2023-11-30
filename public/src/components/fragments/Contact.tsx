import React from 'react'
import {useNavigate} from "react-router-dom"
import {DataUser} from "@/types/userTypes"
type ContactProps = {
     data:DataUser
}
const Contact:React.FC<ContactProps> = (props) => {
  const navigate = useNavigate()
  const {_id,avatarImage,username} = props.data
  const navigateChat = (): void => {
    navigate(`/chat/${_id}`)
  }
  return (
    <section onClick={navigateChat} className="w-full font-josefin py-2 rounded bg-putihPekat flex justify-start gap-3">
      <img src={`data:image/svg+xml;base64,${avatarImage}`} className=" overflow-hidden w-16 h-16 rounded-full border-4 border-transparent" alt={"avatar " + username}/>
      <div className="flex flex-col gap-2 justify-center text-lg font-semibold">
        <h2>{username}</h2>
      </div>
    </section>
  )
}

export default Contact