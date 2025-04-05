"use client"
import { useChatContext } from '@/context/ChatContext';
import { sendMessage } from '@/lib/_server/api';
import React, { RefObject, useEffect, useRef, useState } from 'react'
import ChatContainer from './chat-container';
import useSocket from '@/hooks/useSocket';
import { useUserContext } from '@/context/user-context';
import Skeleton from 'react-loading-skeleton';

const ChatSection = () => {
      const { userId } = useUserContext()
      const { socket } = useSocket()
      const { selectedChat: id, chats, setChats, lastChatQuery, fetchingChat } = useChatContext()
      const [userInput, setUserInput] = useState("")
      const inputref = useRef(undefined) as unknown as RefObject<HTMLInputElement> | undefined
      useEffect(() => {
            if (inputref) {
                  if (inputref.current) {
                        inputref.current.focus()
                  }
            }
      }, [inputref, id])

      const handleSendMessage = async () => {
            if (userInput.trim().length == 0) return;
            setUserInput("")
            const temp = [...chats]
            setChats(prev => [...prev, {
                  "receiverId": id,
                  "senderId": userId,
                  "message": userInput,
                  notsent: true,
            }] as any)
            try {
                  const data = await sendMessage({ receiverId: id as string, message: userInput })
                  setChats(() => [...temp, (data)?.data] as any)
                  socket?.emit("send-message", { senderId: userId, message: data?.data, receiverId: id })
                  setUserInput("")
                  lastChatQuery.refetch()
            } catch (err) {
                  console.log(err)
                  return;
            }
      }
      if (fetchingChat) {
            return <ChatSectionLoadingSkeleton />
      }
      return (
            <>
                  <ChatContainer chats={chats} />
                  <div className='h-12 px-2 bg-slate-500/40 dark:bg-secondary mx-3 rounded-full overflow-hidden'>
                        <form className='flex items-center h-full gap-2 px-3 w-ull' onSubmit={(e) => { e.preventDefault(); handleSendMessage() }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus cursor-pointer"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                              <input onChange={(e) => { setUserInput(e.target.value); }} value={userInput} ref={inputref} type="text" name='name' className='h-full w-full flex-1 bg-transparent focus:outline-none border-none outline-none' />
                              <svg onClick={handleSendMessage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='cursor-pointer'><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                        </form>
                  </div>
            </>
      )
}


const ChatSectionLoadingSkeleton = () => {

      return <div className='flex justify-end p-4 flex-col gap-1 flex-1 w-full'>
            <div className='flex w-full justify-end'>
                  <Skeleton width={"100px"} height={"30px"} />
            </div>
            <div className=''>
                  <Skeleton width={"500px"} height={"80px"} />
            </div>
            <div className='flex w-full justify-end'>
                  <Skeleton width={"500px"} height={"80px"} />
            </div>
            <div className='flex w-full justify-end'>
                  <Skeleton width={"500px"} height={"80px"} />
            </div>
            <div>
                  <Skeleton width={"500px"} height={"80px"} />
            </div>
            <div className='flex w-full justify-end'>
                  <Skeleton width={"500px"} height={"80px"} />
            </div>
            <div className='flex w-full justify-end'>
                  <Skeleton width={"500px"} height={"80px"} />
            </div>
            <div>
                  <Skeleton width={"10%"} height={"40px"} />
            </div>
            <div>
                  <Skeleton width={"40%"} height={"30px"} />
            </div>
            <div className='flex w-full justify-end'>
                  <Skeleton width={"40%"} height={"80px"} />
            </div>

      </div>

}
export default ChatSection