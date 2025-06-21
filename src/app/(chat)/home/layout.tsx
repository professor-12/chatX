import ChatContext from '@/context/ChatContext'
import TabComponent from '@/context/TabContext'
import UserContext from '@/context/user-context'
import React, { FC, ReactNode } from 'react'
import Component from './Component'
import { checkAuth } from '@/lib/_server/auth'
import VideoChatContext from '@/context/VideoChatContext'

const Layout: FC<{ children: ReactNode }> = async (props) => {
      await checkAuth()
      return (
            <UserContext>
                  <ChatContext>
                        <TabComponent>
                              <Component>
                                    {props.children}
                              </Component>
                        </TabComponent>
                  </ChatContext>
            </UserContext>
      )
}

export default Layout