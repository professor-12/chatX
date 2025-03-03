"use client"
import { headers } from 'next/headers'
import React from 'react'
import Chat from './chat'
import { usePathname } from 'next/navigation'
import ContactTab from './contact-tab'
import ProfileTab from './profile-tab'
import SettingsTab from './settings-tab'


const TabContainer = () => {
      const path = usePathname().split("/")[2] || "home"
      console.log(path)
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
            </div>
      )
}

export default TabContainer

