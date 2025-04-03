"use client"
import { useChatContext } from '@/context/ChatContext'
import { getContactPRofile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ChatHeader = () => {
      const { selectedChat, setSelectedChat } = useChatContext()
      const { data } = useQuery({
            queryKey: ["get-user-profile", selectedChat], queryFn: () => {
                  return getContactPRofile(selectedChat as string)
            }
      })
      return (
            <div className='h-16 max-md:bg-white w-full z-[233] max-md:fixed max-md:top-0 backdrop:blur-sm flex px-5 items-center  border-border border-b'>
                  <div className='flex max-md:py-3 gap-4 items-center'>
                        <p className='text-sm mdL:hidden' onClick={() => setSelectedChat("")}>
                              back
                        </p>
                        <div className='h-10 aspect-square rounded-full overflow-hidden bg-card border-border border'>
                              {
                                    !!(data?.data?.profilePics) &&
                                    <img src={data?.data?.profilePics as string} alt="" />
                              }
                        </div>
                        <p className='text-xl font-medium'>{data?.data?.name}</p>
                  </div>
            </div>
      )
}

export default ChatHeader 