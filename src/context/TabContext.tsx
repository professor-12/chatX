"use client"
import { usePathname } from 'next/navigation'
import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'


interface TabContextProps {
      activeTab: null | string | number;
      changeActiveTab: (tab: number) => void
}


const TabContext = React.createContext<TabContextProps>({
      activeTab: null,
      changeActiveTab: (tab: number) => { }
})

const TabComponent: FC<{ children: ReactNode }> = ({ children }) => {
      const pathnames = usePathname().split('/')
      const [activeTab, setActiveTab] = useState<null | string | number>(pathnames[2])

      const changeActiveTab = useCallback((tab: null | string | number) => {
            setActiveTab(tab)
            if (tab) {
                  localStorage.setItem("tab", "" + tab)
            }
      }, [])
      useEffect(() => {
            const activeTab = localStorage.getItem("tab") || "home"
            setActiveTab(activeTab)
            // changeActiveTab(pathnames[2])
      }, [pathnames])
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