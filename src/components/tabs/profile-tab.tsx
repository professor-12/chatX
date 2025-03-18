"use client"
import { getUserProfile } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ProfileTab = () => {
      const { data } = useQuery({ queryKey: ["profile"], queryFn: getUserProfile })
      return (
            <div className='flex flex-col gap-12 w-full h-screen'>
                  <div className='flex hover:bg-slate-300/20 cursor-pointer rounded-full px-3 p-1 items-center  gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                        <p className=''>My Profile</p>
                  </div>
                  <center className='w-fill flex-col gap-4 items-center'>
                        <div className='h-[6rem] w-[6rem] rounded-full bg-red-300'></div>
                        <h1 className='text-lg font-medium'>{data?.data?.name}</h1>
                        <h1>{data?.data?.phoneNumber}</h1>
                        <h1>{data?.data?.address}</h1>
                        <h1>{data?.data?.phoneNumber}</h1>
                        <h1>{data?.data?.phoneNumber}</h1>
                  </center>
            </div>
      )
}

export default ProfileTab