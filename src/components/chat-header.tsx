"use client"
import { useChatContext } from '@/context/ChatContext'
import { getUserProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ChatHeader = () => {
      const { selectedChat } = useChatContext()
      const { data } = useQuery({
            queryKey: ["get-user-profile", selectedChat], queryFn: () => {
                  return getUserProfile(selectedChat as string)
            }
      })
      return (
            <div className='sticky h-16 flex px-5 items-center bg-accent/50 border-border border-b top-0'>
                  {/* Profile */}
                  <div className='flex gap-4 items-center'>
                        <div className='h-10 aspect-square rounded-full overflow-hidden bg-green-300'>
                              <img src={data?.data?.profilePics as string} alt="" />
                        </div>
                        <p className='text-xl font-medium'>{data?.data?.name}</p>
                  </div>

            </div>
      )
}

export default ChatHeader 