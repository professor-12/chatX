"use client"
import { headers } from 'next/headers'
import React from 'react'
import Chat from './chat'
import { usePathname } from 'next/navigation'
import ContactTab from './contact-tab'
import ProfileTab from './profile-tab'
import SettingsTab from './settings-tab'
import UsersTab from './users-tab'


const TabContainer = () => {
      const path = usePathname().split("/")[2] || "home"
      return (
            <div className='p-6 h-screen overflow-hidden'>
                  {
                        path == "home" && <Chat />
                  }
                  {
                        path == "contacts" && <ContactTab />
                  }
                  {
                        path == "profile" && <ProfileTab />
                  }
                  {
                        path == "settings" && <SettingsTab />
                  }
                  {
                        path == "users" && <UsersTab />
                  }
            </div>
      )
}

export default TabContainer

