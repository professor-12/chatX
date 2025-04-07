import ChatContext from '@/context/ChatContext'
import SocketContext from '@/context/socket-context'
import TabComponent from '@/context/TabContext'
import UserContext from '@/context/user-context'
import React, { FC, ReactNode } from 'react'
import Component from './Component'

const Layout: FC<{ children: ReactNode }> = async (props) => {
      return (
            <UserContext>
                  <SocketContext>
                        <ChatContext>
                              <TabComponent>
                                    <Component>
                                          {props.children}
                                    </Component>
                              </TabComponent>
                        </ChatContext>
                  </SocketContext>
            </UserContext>

      )
}

export default Layout