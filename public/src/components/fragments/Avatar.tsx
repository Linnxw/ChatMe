import React from "react"

type AvatarProps = {
  width:string
  height: string
  base64: string
  onClick:(index:number) => void
  index:number 
  selected:number | undefined
}
const Avatar: React.FC<AvatarProps> = ({width,height,base64,onClick,index,selected}) => {
  return (
    <div className={`${width} ${height} overflow-hidden ${selected === index && "ring ring-ungu"} rounded-full border-4 border-transparent`} onClick={()=>onClick(index)}>
      <img
      src={`data:image/svg+xml;base64,${base64}`}
      alt="avatar image"
      className="w-full h-full object-cover"
      />
    </div>
    )
}

export default Avatar