"use client"
import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'


interface TabContextProps {
      activeTab: null | string | number;
      changeActiveTab: (tab: string | null) => void
}


const TabContext = React.createContext<TabContextProps>({
      activeTab: null,
      changeActiveTab: (tab: string | null) => { }
})

const TabComponent: FC<{ children: ReactNode }> = ({ children }) => {
      const [activeTab, setActiveTab] = useState<null | string | number>("home")
      const changeActiveTab = useCallback((tab: null | string | number) => {
            setActiveTab(tab)
            localStorage.setItem("tab", "" + tab)

      }, [])
      useEffect(() => {
            const tab = localStorage.getItem("tab")
            if (!tab) return
            setActiveTab(tab)
      }, [])

      return (
            <TabContext.Provider value={{ activeTab, changeActiveTab }}>{children}</TabContext.Provider>
      )
}

export default TabComponent



export const useTabContext = () => {
      const context = React.useContext(TabContext)
      if (!context) {
            throw new Error('useTabContext must be used within a TabComponent')
      }
      return context
}