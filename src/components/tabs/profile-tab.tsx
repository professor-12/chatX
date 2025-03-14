"use client"
import { getUserProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ProfileTab = () => {
      const { data } = useQuery({ queryKey: ["profile"], queryFn: getUserProfile })

      return (
            <div>{data?.data?.name}</div>
      )
}

export default ProfileTab