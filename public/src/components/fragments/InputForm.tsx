import React from "react"
import {IInputProps} from "@/types/componentType"
const InputForm:React.FC<IInputProps> = (props) => {
  const {type,placeholder,name,change} = props
  return (
    <input onChange={change} name={name} type={type} className="h-10 md:h-20 tracking-wide w-[90%] outline-none text-sm md:text-xl flex items-center placeholder:translate-y-1 alig ring-1 px-3 md:ring-2 md:px-8 rounded ring-ungu bg-transparent focus:ring-unguHover text-putihPekat " placeholder={placeholder} required/>
    )
}

export default InputForm