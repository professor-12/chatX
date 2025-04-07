"use client"
import { useUserContext } from "@/context/user-context"
import { RefObject, useEffect, useRef } from "react"

const ChatContainer = ({ chats }: { chats: Array<any> }) => {
      const { userId } = useUserContext()
      const ref = useRef(undefined) as unknown as RefObject<HTMLDivElement>
      useEffect(() => {
            ref.current?.scrollIntoView({ behavior: "smooth" })
      }, [ref, chats])
      return (
            <section className='flex-1 max-md:pt-[8rem] flex flex-col scroll-hidden overflow-y-auto  p-4 gap-3'>
                  <div className="mt-auto">
                        {
                              chats.map((chat, key) => {
                                    return <ChatCard userId={userId} chat={chat} key={key + chat?.id} />
                              })
                        }
                        <div ref={ref} id="" aria-hidden></div>
                  </div>
            </section>
      )
}

export default ChatContainer




const ChatCard = ({ chat, userId }: { chat: any, userId: string | null }) => {
      const isRight = (userId == (chat?.senderId) || !chat?.senderId)
      return <div className={`py-1 w-full  flex ${isRight && "justify-end"}`}>
            <div className={isRight ? "text-right" : ""}>
                  <div>
                        <div className={` text-black max-w-[20rem]  text-wrap leading-6 p-2 px-4 rounded-xl  ${isRight ? 'rounded-br-none shadow bg-slate-200' : "rounded-bl-none bg-green-400/90"}`}>{chat?.message}
                        </div>
                        {
                              !!chat?.notsent &&
                              <p className="w-full flex justfy-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                              </p>
                        }
                  </div>
                  {
                        chat?.createdAt &&
                        <span className='p-px text-xs text-muted-foreground text-pretty'>{new Intl.DateTimeFormat().format(new Date(chat?.createdAt))}</span>
                  }
            </div>

      </div>
}

