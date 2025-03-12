"use client"
import { useChatContext } from '@/context/ChatContext'
import { getUserProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ProfileTab = () => {
      const { data } = useQuery({ queryKey: ["profile"], queryFn: getUserProfile })
      console.log(data?.data)
      return (
            <div>{data?.data?.name}</div>
      )
}

export default ProfileTab