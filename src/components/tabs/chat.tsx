"use client"
import { getChats, getContact, getUser } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

const Chat = () => {
      const { push } = useRouter()
      const { data, isPending } = useQuery({
            queryFn: getChats,
            queryKey: ["get-chat"]
      })
      return (
            <div className='h-full flex flex-col'>
                  <div className='flex justify-between items-center'>
                        <h1 className='text-2xl text-left'>Chats</h1>
                        <span onClick={() => { push("/home/users") }} className='dark:text-accent-foreground/95 cursor-pointer'>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg>
                        </span>
                  </div>
                  <div className='space-y-2 flex-1 scroll-hidden py-2 pt-6  overflow-auto'>
                        {
                              isPending ?
                                    <div className='flex items-center justify-center'>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide animate-spin lucide-loader"
                                          >
                                                <path d="M12 2v4" />
                                                <path d="m16.2 7.8 2.9-2.9" />
                                                <path d="M18 12h4" />
                                                <path d="m16.2 16.2 2.9 2.9" />
                                                <path d="M12 18v4" />
                                                <path d="m4.9 19.1 2.9-2.9" />
                                                <path d="M2 12h4" />
                                                <path d="m4.9 4.9 2.9 2.9" />
                                          </svg>
                                    </div>
                                    : data?.data?.length == 0 ? "No Chats found" :
                                          data?.data?.map((_, index) => {
                                                return <ChatCard key={index} contact={_} />
                                          })
                        }

                  </div>

            </div >
      )
}

export default Chat

export const ChatCard = ({ contact }: { contact: any }) => {
      return <div className='hover:bg-gradient-to-br from-slate-600/30 to-card hover:scale-100 transition-all duration-200 scale-[98%]  py-[0.75rem] px-2 border-border cursor-pointer  rounded-xl'>
            <div className='flex items-center justify-between'>
                  <div className='flex  items-center gap-1'>
                        <img
                              src={"/file.svg"}
                              alt='avatar'
                              className='w-14 border border-border h-14 rounded-full'
                        />
                        <div className='ml-4'>
                              <h1 className='text-lg truncate'>{contact?.name}</h1>
                              <div className='flex w-full items-center  gap-2'>
                                    <p className='text-sm text-gray-400 truncate max-w-[60%]'>{contact?.lastMessage}</p>
                                    <div className='w-[0.3rem] h-[0.3rem] rounded-full bg-slate-500'></div>
                                    <p className='text-sm text-gray-400 truncate'>{
                                          new Intl.DateTimeFormat().format(contact.time as Date)
                                    }</p>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
}

