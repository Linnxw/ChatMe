import React from "react"
type ContainerProps = {
  paddingY?:string
  gap?:string
  align:string
  className?: string
  justify?: string
}
/*
--Props--
optional:
padding default padding y 20,
gap default 0
className default empty
required:align
*/
const Container = ({children,paddingY="py-20",gap="gap-0",align,className="",justify="justify-center"}:React.PropsWithChildren<ContainerProps>) => {
  return (
    <div 
      className={`${className} w-screen min-h-screen bg-hitamPudar flex ${justify} ${align + " " + paddingY + " " + gap} md:items-center`}>
       {children}
    </div>
  )
}

export default Container