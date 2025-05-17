"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Peer } from "peerjs";
import useSocket from '@/hooks/useSocket';
import { checkAuth } from '@/lib/_server/auth';
import Stream from 'stream';
import usePeer from '@/hooks/use-peer';
const Context = createContext({})



export const useVideoContext = () => {
      const context = useContext(Context)
      if (!context) throw new Error("Context not found")

      return context
}

const VideoChatContext = ({ children }: { children: React.ReactNode }) => {
      const { peer, peerId } = usePeer()

      const { socket } = useSocket()
      const [localStream, setLocalStream] = useState(undefined)

      const handleCallUser = (id) => {
            if (peerId) {
                  socket?.emit("call:user", id, peerId)
            }
      }

      useEffect(() => {
            const handleIncomingCall = (user_peerId: string) => {
                  if (!peerId || !localStream) return;
                  // const call = peer?.call(user_peerId, localStream)
                  // call.on("stream", (stream) => {
                  //       console.log("Stream Received")
                  // })
            }
            socket?.on("incomming:call", handleIncomingCall)
            return () => {
                  socket?.off("incomming:call", handleIncomingCall)
            }
      }, [socket, peerId])
      useEffect(() => {
            console.log(peerId)
      }, [peerId, localStream])
      return (
            <Context.Provider value={{ handleCallUser }}>{children}</Context.Provider>
      )
}

export default VideoChatContext