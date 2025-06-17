"use client"
import React, { createContext, FC, ReactNode, useContext, useEffect } from 'react'
import useSocket from '@/hooks/useSocket';

const Context = createContext({})


const SocketContext: FC<{ children: ReactNode }> = ({ children }) => {
      const { socket } = useSocket()

      useEffect(() => {
            socket?.on("call:user", (userId, peerId) => {
                  alert(`You have a call from ${userId} with peer ID: ${peerId}`);
            })
      }, [socket])
      return (
            <Context.Provider value={{ socket }}>{children}</Context.Provider>
      )
}


export const useSocketContext = () => {
      const context = useContext(Context)

      if (!context) throw new Error("Context not found....")

      return context
}

export default SocketContext