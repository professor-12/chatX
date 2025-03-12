import SideNav from '@/components/side-nav'
import TabContainer from '@/components/tabs/tabcontainer'
import ChatContext from '@/context/ChatContext'
import TabComponent from '@/context/TabContext'
import React, { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = async (props) => {
      return (
            <TabComponent>
                  <div className='w-full flex h-screen  overflow-hidden relative'>
                        {/* Side nav */}
                        <div className='h-full w-[80px]   bg-accent dark:bg-accent/45 border-r'>
                              <SideNav />
                        </div>
                        {/* Users */}
                        <div className='h-full min-w-[20rem] w-[24%] bg-card border-r'>
                              <TabContainer />
                        </div>
                        <div className='h-full flex-[3] bg-card border-r'>
                              {props.children}
                        </div>
                  </div>
            </TabComponent >

      )
}

export default Layout