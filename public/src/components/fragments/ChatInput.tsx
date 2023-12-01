import React from 'react'
import {BsEmojiSmileFill} from "react-icons/bs"
import {IoSend} from "react-icons/io5"
type InputProps = {
  onChange:(e:any) => void
  value: string
  setIsShowEmoji:() => void
  sendMessage:() => void
}
const ChatInput:React.FC<InputProps> = ({onChange,value,setIsShowEmoji,sendMessage}) => {
  return (
    <section className="flex py-2 text-putihTerang font-sans h-auto w-screen items-center">
      <div onClick={setIsShowEmoji} className="h-9 flex items-center justify-center w-[10%]">
        <BsEmojiSmileFill className="text-amber-200 text-2xl" data-type="emoji"/>
      </div>
      <div className="relative h-9 w-[90%]">
        <input type="teks" className="outline-none pl-3 pr-10 w-[85%] h-full rounded-full bg-putihPekat" onChange={onChange} value={value}/>
        <button onClick={sendMessage} className="bg-unguBg absolute right-2 rounded-full h-full px-7"><IoSend/></button>
      </div>
      
    </section>
  )
}

export default ChatInput