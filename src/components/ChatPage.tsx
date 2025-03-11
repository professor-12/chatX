import React from 'react'
import ChatHeader from './chat-header'
import ChatSection from './chat-section'

const ChatPage = () => {
      return (
            <main className='h-screen bg-popover pb-12 flex flex-col relative'>
                  <ChatHeader />
                  <ChatSection />
            </main>
      )
}

export default ChatPage