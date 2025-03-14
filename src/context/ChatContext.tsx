"use client"
import useSocket from '@/hooks/useSocket'
import { getMessages } from '@/lib/_server/api'
import { checkAuth } from '@/lib/_server/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './user-context'

interface IContext {
      selectedChat: null | string
      setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>
      fetchChat: () => Promise<void>
      chats: Array<any>
      setChats: React.Dispatch<React.SetStateAction<never[]>>
      fetchingChat: boolean
      userId: string | null

}


const Context = createContext<IContext>({} as any)
const ChatContext = ({ children }: { children: React.ReactNode }) => {
      const { socket } = useSocket()
      const [selectedChat, setSelectedChat] = useState<null | string>(null)
      const [chats, setChats] = useState([]) as any
      const { userId } = useUserContext()
      const [fetchingChat, setFetchingChat] = useState(true)

      const fetchChat = async () => {
            if (!selectedChat) return
            const message = await getMessages(selectedChat)
            setChats(message.data as any)
            setFetchingChat(false)
      }

      useEffect(() => {
            fetchChat()
      }, [selectedChat])
      useEffect(() => {
            socket?.on("get-message", ({ senderId, message }) => {
                  if (senderId !== selectedChat) return
                  setChats((prev: any) => {
                        return [...prev, message]
                  })
            })
            return () => {
                  socket?.off("get-message", ({ senderId, message }) => {
                        if (senderId !== selectedChat) return
                        setChats((prev: any) => {
                              return [...prev, message]
                        })
                  })
            }
      }, [socket, selectedChat])

      return (
            <Context.Provider value={{ selectedChat, setSelectedChat, fetchChat, chats, setChats, fetchingChat, userId }}>{children}</Context.Provider>
      )
}

export default ChatContext

export const useChatContext = () => {
      const context = useContext(Context)

      if (!context) throw new Error("Context not found")

      return context
}