import React,{PropsWithChildren} from "react"

type Props = {
  title:string,
  submit:React.FormEventHandler
}

const FormLayout = ({title,submit,children}: PropsWithChildren<Props>) =>{
  return (
    <div className="bg-hitamPekat py-6 md:py-20 md:px-10 px-3 w-[85%] md:w-[80%] gap-3 md:gap-8 flex flex-col items-center rounded md:rounded-lg text-putihTerang font-josefin ">
      <h1 className="text-3xl md:text-5xl font-sans">{title}</h1>
      <form onSubmit={submit} className="p-3 w-full gap-5 md:gap-8 flex flex-col items-center text-md">
        {
          children
        }
      </form>
    </div>
    )
}

export default FormLayout