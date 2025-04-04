"use client"
import MobilePage from '@/components/(mobile)/MobilePage'
import MobileNav, { SmallNav } from '@/components/mobile/SideNav'
import SideNav from '@/components/side-nav'
import TabContainer from '@/components/tabs/tabcontainer'
import { useChatContext } from '@/context/ChatContext'
import { useTabContext } from '@/context/TabContext'
import useMobile from '@/hooks/useMobile'
import React, { act } from 'react'

const Component = ({ children }) => {
      const isMobile = useMobile()
      const { selectedChat } = useChatContext()
      // console.log(activeTab)
      return (isMobile ?
            <div className='h-[100dvh] relative flex flex-col'>
                  <MobilePage />
                  {
                        !selectedChat &&
                        <SmallNav />
                  }
            </div>
            :
            <div className='w-full flex h-screen  overflow-hidden relative'>
                  {/* Desktop Screen Side navigation bar */}
                  <div className='md:h-full max-md:hidden bottom-0 w-full md:w-[80px]   bg-accent dark:bg-accent/45 border-r'>
                        <SideNav />
                  </div>
                  {/* Medium Screen nav */}
                  <div className='md:hidden'>
                        <MobileNav />
                  </div>
                  <div className='h-full min-w-[20rem] w-[24%] bg-card border-r'>
                        <TabContainer />
                  </div>
                  <div className='h-full flex-[3] bg-card border-r'>
                        {children}
                  </div>
            </div>

      )
}

export default Component