"use client"
import { useChatContext } from '@/context/ChatContext'
import { useTabContext } from '@/context/TabContext'
import { getContactProfile, getGroupProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ChatHeader = () => {
      const { selectedChat, setSelectedChat } = useChatContext()
      const check = () => {
            return selectedChat.isGroup ? getGroupProfile(selectedChat.id as string) : getContactProfile(selectedChat.id as string)
      }
      let { changeActiveTab } = useTabContext()
      const { data, isPending } = useQuery({
            queryKey: ["get-user-profile", selectedChat], queryFn: () => {
                  return check()
            }
      })
      return (
            <div className='h-16 dark:bg-black max-md:bg-white left-0 top-0 max-md:fixed w-full z-[233] max-md:top-0 backdrop:blur-sm flex px-5 items-center  border-border border-b'>
                  {isPending ? <ChatHeaderLoadingSkeleton /> :
                        <div className='flex w-full justify-between items-center'>
                              <div className='flex items-center gap-4'>
                                    <p className='text-sm md:hidden' onClick={() => { setSelectedChat((prev) => ({ ...prev, id: null, isGroup: false })); changeActiveTab("home") }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                                    </p>
                                    <div className='h-10 aspect-square relative rounded-full overflow-hidden bg-card border-border border'>
                                          {
                                                !!(data?.data?.profilePics) &&
                                                <Image src={data?.data?.profilePics as string} fill alt="" />
                                          }
                                    </div>
                                    <p className='text-xl font-medium'>{data?.data?.name}</p>
                              </div>
                              {/* <div onClick={() => { setSelectedChat((prev) => ({ ...prev, type: "video" })) }}>
                                    <div className='flex items-center text-muted cursor-pointer hover:bg-primary/10 p-2 justify-center size-[40px] rounded-full'>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide cursor-pointer text-slate-800 lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg>
                                    </div>
                              </div> */}

                        </div>
                  }
            </div >
      )
}

const ChatHeaderLoadingSkeleton = () => {
      return (
            <div className='flex py-3 gap-2 items-center'>
                  <Skeleton borderRadius={"50%"} height={"40px"} width={"40px"} />
                  <Skeleton height={"20px"} width={"90px"} />
            </div>
      )
}
export default ChatHeader