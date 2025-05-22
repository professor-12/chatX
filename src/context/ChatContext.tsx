"use client"
import useSocket from '@/hooks/useSocket'
import { getChats, getMessages } from '@/lib/_server/api'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './user-context'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface IContext {
      selectedChat: { id: null | string, isGroup: boolean, type: "video" | "chat" }
      setSelectedChat: React.Dispatch<React.SetStateAction<{ id: string | null, isGroup: boolean, type: "video" | "chat" }>>
      fetchChat: (a: { id: string, isGroup: boolean }) => Promise<void>
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
      const [selectedChat, setSelectedChat] = useState<{ id: null, isGroup: false, type: "video" | "chat" }>({ id: null, isGroup: false, type: "chat" }) as any
      const { isGroup, id } = selectedChat
      const [chats, setChats] = useState([]) as any
      const { userId } = useUserContext()
      const [fetchingChat, setFetchingChat] = useState(true)

      const fetchChat = async ({ controller, id, isGroup = false }: { id: string, isGroup: boolean, controller: AbortController }) => {
            if (!id) return
            setFetchingChat(true)
            try {
                  fetch('/api/getMessages', { method: "POST", body: JSON.stringify({ id, isGroup }), signal: controller.signal })
                        .then((data) => data.json())
                        .then((json) => {
                              setChats(json.data as any)
                        })
            } catch (err) {
                  console.log(err)
            } finally {
                  setFetchingChat(false)
            }
      }
      useEffect(() => {
            if (!id) return
            const controller = new AbortController();
            (async () => {
                  setFetchingChat(true)
                  try {
                        const resource = await fetch('/api/getMessages', { method: "POST", body: JSON.stringify({ id, isGroup }), signal: controller.signal });
                        const data = await resource.json()
                        setChats(data.data as any)

                  } catch (err) {
                        console.log(err)
                  } finally {
                        console.log("This is called");
                        setFetchingChat(false)
                  }
            })()
            // fetchChat({ controller, id, isGroup })
            return () => {
                  controller.abort()
                  setFetchingChat(true)
                  // setSelectedChat({ isGroup: false, type: "chat", id: null })
            }
      }, [isGroup, id])

      useEffect(() => {
            socket?.on("get-message", ({ senderId, message }) => {
                  if (senderId !== id) return
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
      }, [socket, id, selectedChat])

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