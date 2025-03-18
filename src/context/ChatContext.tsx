"use client"
import useSocket from '@/hooks/useSocket'
import { getChats, getMessages } from '@/lib/_server/api'
import { checkAuth } from '@/lib/_server/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './user-context'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

interface IContext {
      selectedChat: null | string
      setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>
      fetchChat: () => Promise<void>
      chats: Array<any>
      setChats: React.Dispatch<React.SetStateAction<never[]>>
      fetchingChat: boolean
      userId: string | null
      lastChatQuery: UseQueryResult<{
            error: string | null;
            data?: undefined;
      } | {
            data: {
                  id: string;
                  name: string;
                  avatar: string;
                  lastMessage: string;
                  time: Date;
            }[];
            error?: undefined;
      } | {
            error: string;
            data: null;
      }, Error>

}
const Context = createContext<IContext>({} as any)
const ChatContext = ({ children }: { children: React.ReactNode }) => {
      const lastChatQuery = useQuery({
            queryFn: getChats,
            queryKey: ["get-chat"]
      })
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
                  lastChatQuery.refetch()
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
            <Context.Provider value={{ selectedChat, setSelectedChat, fetchChat, chats, setChats, fetchingChat, userId, lastChatQuery }}>{children}</Context.Provider>
      )
}

export default ChatContext

export const useChatContext = () => {
      const context = useContext(Context)

      if (!context) throw new Error("Context not found")

      return context
}