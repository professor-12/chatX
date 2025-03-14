"use client"
import { useChatContext } from '@/context/ChatContext'
import { getContactPRofile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ChatHeader = () => {
      const { selectedChat } = useChatContext()
      const { data } = useQuery({
            queryKey: ["get-user-profile", selectedChat], queryFn: () => {
                  return getContactPRofile(selectedChat as string)
            }
      })
      return (
            <div className='h-16 sti backdrop:blur-sm flex px-5 items-center  border-border border-b'>

                  <div className='flex gap-4 items-center'>
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