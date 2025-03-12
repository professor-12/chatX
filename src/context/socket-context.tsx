"use client"
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { useChatContext } from './ChatContext';
import useSocket from '@/hooks/useSocket';

const Context = createContext({})


const SocketContext: FC<{ children: ReactNode }> = ({ children }) => {
      const { socket } = useSocket()


    

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