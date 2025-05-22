"use client"
import React, { useEffect, useState } from 'react'
import VideoHeader from './components/video-header'
import Layout from './layout'
import VideoContainer from './components/video-container'
import useSocket from '@/hooks/useSocket'
import RingingUi from './components/RingingUi'

const VideoChatPage = () => {
      const { socket } = useSocket()
      const [answeredCall, setAnsweredCall] = useState(false)


      useEffect(() => {

      }, [socket])
      return (
            <Layout>
                  <div className="h-[100dvh] w-full bg-slate-200/10">
                        <VideoHeader />
                        {/* <VideoContainer /> */}
                        <RingingUi />
                  </div>
            </Layout>
      )
}

export default VideoChatPage





