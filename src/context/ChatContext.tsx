"use client"
import { getMessages } from '@/lib/_server/api'
import { checkAuth } from '@/lib/_server/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface IContext {
      selectedChat: null | string
      setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>
      fetchChat: () => Promise<void>
      chats: Array<any>
      setChats: React.Dispatch<React.SetStateAction<never[]>>
      fetchingChat: boolean
      userId: string | null
      setUserId: React.Dispatch<React.SetStateAction<null | string>>

}


const Context = createContext<IContext>({} as any)
const ChatContext = ({ children }: { children: React.ReactNode }) => {
      const [selectedChat, setSelectedChat] = useState<null | string>(null)
      const [chats, setChats] = useState([])
      const [userId, setUserId] = useState<null | string>(null)
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
            const getUserId = async () => {
                  const { data } = await checkAuth()
                  setUserId(data as string)
            }
            getUserId()
      }, [])
      return (
            <Context.Provider value={{ selectedChat, setSelectedChat, fetchChat, chats, setChats, fetchingChat, setUserId, userId }}>{children}</Context.Provider>
      )
}

export default ChatContext

export const useChatContext = () => {
      const context = useContext(Context)

      if (!context) throw new Error("Context not found")

      return context
}