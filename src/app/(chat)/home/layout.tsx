import { ERROR_CONSTANT } from '@/constants/error'
import ChatContext from '@/context/ChatContext'
import SocketContext from '@/context/socket-context'
import TabComponent from '@/context/TabContext'
import UserContext from '@/context/user-context'
import { checkAuth } from '@/lib/_server/auth'
import { redirect } from 'next/navigation'
import React, { FC, ReactNode } from 'react'
import Component from './Component'

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