"use client"
import React, { Ref, useEffect, useRef } from 'react'
import VideoHeader from './components/video-header'
import useSocket from '@/hooks/useSocket'
import usePeer from '@/hooks/use-peer'
import { useChatContext } from '@/context/ChatContext'
import useCallUser from '@/hooks/use-call-user'
import useLocalStream from '@/hooks/use-localStream'
import Layout from './layout'
import { useVideoContext } from '@/context/VideoChatContext'

const VideoChatPage = () => {
      const { socket } = useSocket()
      const { peer, peerId } = usePeer()
      // const { handleCallUser } = useVideoContext()
      const local = useLocalStream()
      const { selectedChat } = useChatContext()
      const { remoteStreams } = useCallUser(local)
      useEffect(() => {
            if (peerId && selectedChat.id) {
                  // handleCallUser(selectedChat.id)
            }
      }, [socket, peerId])
      const ref = useRef([]) as any
      useEffect(() => {
            (async () => {
                  if (ref) {
                        if (ref.current) {
                              ref.current.srcObject = local
                        }
                  }
            })()
      }, [local])
      return (
            <Layout>
                  <div className="h-[100dvh] w-full bg-slate-200/10">
                        <VideoHeader />
                        <main className='w-full space-y-3 px-4'>
                              <div className='w-4/5 bg-gray-300/30 overflow-hidden border-4   border-blue-300 min-w-[200px]  relative  2xl:aspect-video rounded-2xl'>
                                    <video ref={ref} className='w-full h-full object-cover -scale-x-100 object-center inset-0 top-0 bottom-0 left-0 right-0' muted autoPlay  ></video>
                                    <div className='absolute flex flex-col justify-en  z-12 top-0 right-0 w-[20%] gap-3  p-2  h-full'>
                                          <div className='w-full aspect-video relative rounded-lg bg-red-100'>
                                                {/* <video ref={ref} className='w-full h-full object-cover -scale-x-100 object-center inset-0 top-0 bottom-0 left-0 right-0' muted autoPlay  ></video> */}
                                          </div>
                                          <div className='w-full overflow-hidden relative rounded-lg bg-red-100'>
                                                {/* <video ref={ref} className='w-full h-full object-cover -scale-x-100 object-center inset-0 top-0 bottom-0 left-0 right-0' muted autoPlay  ></video> */}
                                          </div>
                                          <div className='w-oveflow-hidden  relative rounded-lg bg-red-100'>
                                                {/* <video ref={ref} className='w-full h-full object-cover -scale-x-100 object-center inset-0 top-0 bottom-0 left-0 right-0' muted autoPlay  ></video> */}
                                          </div>
                                    </div>
                              </div>
                              <div className='w-4/5 h-16 flex justify-center  bg-primary/10 items-center gap-6 rounded-full'>
                                    <div className='bg-neutral-300/40 hover:bg-neutral-400/70 transition-colors duration-150 p-2 cursor-pointer  rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic-icon lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg></div>
                                    <div className='bg-neutral-300/40 hover:bg-neutral-400/70 transition-colors duration-150 p-2 cursor-pointer  rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg></div>
                                    <div className='bg-neutral-300/40 hover:bg-neutral-400/70 transition-colors duration-150 p-2 cursor-pointer  rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop-minimal-icon lucide-laptop-minimal"><rect width="18" height="12" x="3" y="4" rx="2" ry="2" /><line x1="2" x2="22" y1="20" y2="20" /></svg></div>
                                    <div className='bg-neutral-300/40 hover:bg-neutral-400/70 transition-colors duration-150 p-2 cursor-pointer  rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smile-plus-icon lucide-smile-plus"><path d="M22 11v1a10 10 0 1 1-9-10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /><path d="M16 5h6" /><path d="M19 2v6" /></svg></div>
                                    <div className='bg-red-500/80 cursor-pointer  p-2  rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide text-white lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg></div>
                              </div>
                        </main>
                  </div>
            </Layout>
      )
}

export default VideoChatPage