interface BubbleProps{
  message: string
  fromSelf:boolean
}

const BubbleChat = ({data,scrollRef}:{data:BubbleProps,scrollRef:any}) => {
  const borderRadius = {
    sended:"rounded-b-3xl rounded-l-3xl",
    recieved:"rounded-b-3xl rounded-r-3xl"
  }
  return (
    <section ref={scrollRef}  className={`flex p-2 w-full items-center ${data.fromSelf ? "justify-end":"justify-start"}`}>
      <div className={`py-2 px-4 ${data.fromSelf ? "bg-biru "+borderRadius.sended :"bg-putihPekat "+borderRadius.recieved} font-sans text-white max-w-[80%]`}>
        <h4 className="break-words">{data.message}</h4>
      </div>
    </section>
  )
}

export default BubbleChat