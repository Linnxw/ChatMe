import React from "react"
export interface IInputProps {
  type: string
  placeholder: string
  name:string
  change:(e:React.ChangeEvent<HTMLInputElement>) => void
}