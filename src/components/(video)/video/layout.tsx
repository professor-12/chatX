import VideoChatContext from '@/context/VideoChatContext'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
      return (
            <VideoChatContext>{children}</VideoChatContext>
      )
}

export default Layout