"use client"
import React from 'react'
import Chat from './chat-tab'
import ContactTab from './contact-tab'
import ProfileTab from './profile-tab'
import SettingsTab from './settings-tab'
import UsersTab from './users-tab'
import { useTabContext } from '@/context/TabContext'


const TabContainer = () => {
      const { activeTab } = useTabContext()
      return (
            <div className='p-6 h-screen overflow-hidden'>
                  {
                        activeTab == "home" && <Chat />
                  }
                  {
                        activeTab == "contacts" && <ContactTab />
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
            </div>
      )
}

export default TabContainer

