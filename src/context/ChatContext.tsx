"use client"
import { getMessages } from '@/lib/_server/api'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface IContext {
      selectedChat: null | string
      setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>
      fetchChat: () => Promise<void>
      chats: Array<any>
      setChats: React.Dispatch<React.SetStateAction<never[]>>
      fetchingChat: boolean

}


const Context = createContext<IContext>({} as any)
const ChatContext = ({ children }: { children: React.ReactNode }) => {
      const [selectedChat, setSelectedChat] = useState<null | string>(null)
      const [chats, setChats] = useState([])
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
      return (
            <Context.Provider value={{ selectedChat, setSelectedChat, fetchChat, chats, setChats, fetchingChat }}>{children}</Context.Provider>
      )
}

export default ChatContext

export const useChatContext = () => {
      const context = useContext(Context)

      if (!context) throw new Error("Context not found")

      return context
}