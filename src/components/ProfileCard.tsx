import { getUserProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

const ProfileCard = () => {
      const { data } = useQuery({ queryKey: ["profile"], queryFn: getUserProfile })
      return (
            <div className='flex justify-center cursor-pointer'>
                  {
                        data?.data?.profilePics ?
                              <div className='w-[40px]  flex items-center aspect-square overflow-hidden relative rounded-full ring bg-card'>
                                    <Image src={data?.data?.profilePics} fill alt="profile Picture" />
                              </div> :
                              <div className='w-[40px]  flex items-center aspect-square rounded-full ring bg-card'></div>
                  }
            </div>
      )
}

export default ProfileCard