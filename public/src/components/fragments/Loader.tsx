import loaderGIF from "@/assets/loader.gif"
import React from "react"
const Loader:React.FC = () => {
  return (
    <img 
    src={loaderGIF} 
    alt="loader.gif"
    className="w-[90%]"/>
    )
}

export default Loader