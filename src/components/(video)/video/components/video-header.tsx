"use client"

import { useChatContext } from '@/context/ChatContext'
import { getContactProfile, getGroupProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'

const VideoHeader = () => {
      const { selectedChat } = useChatContext()
      const check = () => {
            return selectedChat.isGroup ? getGroupProfile(selectedChat.id as string) : getContactProfile(selectedChat.id as string)
      }
      const { data, isPending } = useQuery({
            queryKey: ["get-user-profile", selectedChat], queryFn: () => {
                  return check()
            }
      })
      if (!selectedChat.id) {
            redirect("/home")
      }
      return (
            <div className='w-full bg-card border-b border-border py-1 flex items-center px-3 h-16'>
                  <div className='flex items-center gap-3'>
                        <div className='aspect-square overflow-hidden  w-10 rounded-xl bg-gray-500/60 relative'>
                              <div style={{ backgroundImage: `url("${data?.data?.profilePics}")` }} className='h-full w-full  top-0 bottom-0 right-0 left-0 object-cover object-center'></div>
                        </div>
                        <div className='space-y-1'>
                              <p className='text-xs text-slate-500/80 leading-[1]'>Thursday, 21 Dec</p>
                              <h1 className='font-[600] leading-[1]'>{data?.data?.name}</h1>
                        </div>
                  </div>
            </div>
      )
}

export default VideoHeader