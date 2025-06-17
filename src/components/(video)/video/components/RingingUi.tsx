import { useChatContext } from '@/context/ChatContext'
import useCallUser from '@/hooks/use-call-user'
import { getContactProfile, getGroupProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const RingingUi = () => {
      const [noAnswer, setNoAnswer] = useState(false);
      const { selectedChat } = useChatContext()
      const check = () => {
            return selectedChat.isGroup ? getGroupProfile(selectedChat.id as string) : getContactProfile(selectedChat.id as string)
      }
      const { data, isPending } = useQuery({
            queryKey: ["get-user-profile", selectedChat], queryFn: () => {
                  return check();
            }
      })
      useCallUser()
      useEffect(() => {
            let time = setTimeout(() => {
                  // setNoAnswer(true)
            }, 10000)
            return () => {
                  clearTimeout(time)
            }
      }, [])

      if (noAnswer) {
            return <div className='w-full h-dvh bg-gray-300/30 dark:bg-card p-6'>No Answer</div>
      }
      return (
            <div className='w-full h-dvh bg-gray-300/30 dark:bg-card p-6 flex items-center justify-center'>
                  <div className="flex items-center">
                        <img src="/ringing.gif" className="object-cover h-[8rem] w-[8rem]" />
                        <h1 className="dark:text-white text-2xl text-center">Calling {data?.data?.name}...</h1>
                  </div>
            </div>
      )
}

export default RingingUi