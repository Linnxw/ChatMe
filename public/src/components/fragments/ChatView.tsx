import React from 'react'
import {DataUser} from "@/types/userType"
const Header = ({currentChat}:{currentChat:DataUser}) => {
  return (
    <section className="w-full font-josefin h-[10%] py-2 bg-hitamPudar flex justify-start gap-3">
        <img src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`} className=" overflow-hidden w-14 h-14 rounded-full border-4 border-transparent" alt={"avatar " + currentChat?.username}/>
        <div className="flex flex-col gap-2 justify-center text-xl font-semibold">
          <h1>{currentChat?.username}</h1>
        </div>
      </section>
  )
}

const Container = ({children}:React.PropsWithChildren) => {

  return (
    <div className="w-screen h-[80%] overflow-y-scroll">
    {children}
    </div>
  )
}

const ChatView = {
  Header,Container
}

export default ChatView