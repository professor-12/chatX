import MobileNav from '@/components/mobile/SideNav'
import SideNav from '@/components/side-nav'
import TabContainer from '@/components/tabs/tabcontainer'
import { ERROR_CONSTANT } from '@/constants/error'
import ChatContext from '@/context/ChatContext'
import SocketContext from '@/context/socket-context'

import TabComponent from '@/context/TabContext'
import UserContext from '@/context/user-context'
import { checkAuth } from '@/lib/_server/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = async (props) => {
      const { data, error } = await checkAuth()
      if (error == ERROR_CONSTANT.NOT_AUTHORIZED) {
            return redirect("/login")
      }
      return (
            <UserContext>
                  <SocketContext>
                        <ChatContext>
                              <TabComponent>
                                    {/* Mobile */}
                                    {/* Desktop */}
                                    <>
                                          <div className='w-full flex h-screen  overflow-hidden relative'>
                                                {/* Side nav */}
                                                <div className='md:h-full max-md:hidden bottom-0 w-full md:w-[80px]   bg-accent dark:bg-accent/45 border-r'>
                                                      <SideNav />
                                                </div>
                                                {/* Mobile nav */}
                                                <div className='md:hidden'>
                                                      <MobileNav />
                                                </div>
                                                <div>

                                                </div>
                                                {/* Users */}
                                                <div className='h-full min-w-[20rem] w-[24%] bg-card border-r'>
                                                      <TabContainer />
                                                </div>
                                                <div className='h-full flex-[3] bg-card border-r'>
                                                      {props.children}
                                                </div>
                                          </div>
                                    </>
                              </TabComponent>
                        </ChatContext>
                  </SocketContext>
            </UserContext>

      )
}

export default Layout