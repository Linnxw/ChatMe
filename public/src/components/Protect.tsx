import React from "react"

const Protect = ({children}:React.PropsWithChildren) => {
  if(localStorage.getItem("chat-app")){
    const getUserFromStorage: string = localStorage.getItem("chat-app")!
    const user = JSON.parse(getUserFromStorage)
    if(user.isAvatarImageSet){
      return children
    }else{
      window.location.href= "/setavatar"
    }
  }else{
  window.location.href= "/login"
  }
}

export default Protect