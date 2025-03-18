"use client"
import { checkAuth } from '@/lib/_server/auth'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const Context = createContext<{ userId: string | null }>({ userId: null })

const UserContext = ({ children }: { children: React.ReactNode }) => {
      const [userId, setUserId] = useState<null | string>(null)
      const getUserId = useCallback(
            async () => {
                  const { data } = await checkAuth()
                  setUserId(data as string)
            }, [])
      useEffect(() => {
            getUserId()
      }, [])
      return (
            <Context.Provider value={{ userId }}>{children}</Context.Provider>
      )
}


export default UserContext


export const useUserContext = () => {
      const context = useContext(Context)

      if (!context) throw new Error("Context not found")

      return context

}