import { useChatContext } from '@/context/ChatContext'
import { getContactProfile, getGroupProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const RingingUi = () => {
      const [noAnswer,setNoAnswer] = useState(false);
      const { selectedChat , setSelectedChat } = useChatContext()
            const check = () => {
                  return selectedChat.isGroup ? getGroupProfile(selectedChat.id as string) : getContactProfile(selectedChat.id as string)
            }
            const { data, isPending } = useQuery({
                  queryKey: ["get-user-profile", selectedChat], queryFn: () => {
                        return check()
                  }
            })

            useEffect(()=> {
                  let time = setTimeout(() => {
                        setNoAnswer(true)
                  return () => {
                        clearTimeout(time)
                  }
                  },10000)
            },[])
            if (noAnswer) {
                  return <div className='w-full h-dvh bg-red-400 p-6'>No Answer</div>
            }
      return (
            <div className='w-full h-dvh bg-red-400 p-6'>
                  <img src="/ringing.gif" className="object-cover"/>
            </div>
      )
}

export default RingingUi