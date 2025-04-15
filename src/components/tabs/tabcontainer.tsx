"use client"
import React from 'react'
import Chat from './chat-tab'
import ContactTab from './contact-tab'
import ProfileTab from './profile-tab'
import SettingsTab from './settings-tab'
import UsersTab from './users-tab'
import { useTabContext } from '@/context/TabContext'
import useMobile from '@/hooks/useMobile'
import { useChatContext } from '@/context/ChatContext'
import ChatPage from '../chats/ChatPage'
import GroupChat from './group-tab'


const TabContainer = () => {
      const isMobile = useMobile()
      const { activeTab } = useTabContext()
      const { selectedChat } = useChatContext()
      return (
            <div className={`${isMobile ? "p-4" : "p-6"} h-[100dvh] py-4 overflow-hidden`}>
                  {
                        activeTab == "home" && !isMobile && <Chat />
                  }
                  {
                        (activeTab == "home" && isMobile) && (selectedChat.id ?
                              <div className='py-4'>
                                    <ChatPage />
                              </div>
                              : <Chat />)
                  }
                  {
                        activeTab == "contacts" && !isMobile && <ContactTab />
                  }
                  {
                        (activeTab == "contacts" && isMobile) && (selectedChat.id ?
                              <div className='py-4'>
                                    <ChatPage />
                              </div>
                              : <ContactTab />)
                  }
                  {
                        activeTab == "profile" && <ProfileTab />
                  }
                  {
                        activeTab == "settings" && <SettingsTab />
                  }
                  {
                        activeTab == "users" && <UsersTab />
                  }
                  {
                        activeTab == "group" && <GroupChat />
                  }
            </div>
      )
}

export default TabContainer

