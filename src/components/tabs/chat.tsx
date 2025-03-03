"use client"
import { getContact, getUser } from '@/lib/_server/api'
import React from 'react'

const Chat = () => {

      return (
            <div className='h-full flex flex-col'>
                  <div className='flex justify-between items-center'>
                        <h1 className='text-2xl text-left'>Chats</h1>
                  </div>
                  <div className='space-y-2 flex-1 scroll-hidden py-2 pt-6  overflow-auto'>
                        {
                              new Array(8).fill(null).map((_, index) => {
                                    return <ChatCard key={index} contact={{}} />
                              })
                        }
                  </div>

            </div>
      )
}

export default Chat

const ChatCard = ({ contact }: { contact: any }) => {
      return <div className='hover:bg-gradient-to-br from-slate-600/30 to-card hover:scale-100 transition-all duration-200 scale-[98%]  py-[0.75rem] px-2 border-border cursor-pointer  rounded-xl'>
            <div className='flex items-center justify-between'>
                  <div className='flex  items-center gap-1'>
                        <img

                              src={"/file.svg"}
                              alt='avatar'
                              className='w-14 border border-border h-14 rounded-full'
                        />
                        <div className='ml-4'>
                              <h1 className='text-lg'>Emmanuel</h1>
                              <div className='flex w-full items-center  gap-2'>
                                    <p className='text-sm text-gray-400 truncate max-w-[60%]'>aasc ascs ascsascaacs acs asc</p>
                                    <div className='w-[0.3rem] h-[0.3rem] rounded-full bg-slate-500'></div>
                                    <p className='text-sm text-gray-400 truncate'>Tue</p>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
}