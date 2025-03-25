import React from 'react'
import ChatHeader from './chat-header'
import ChatSection from './chat-section'

const ChatPage = () => {
      return (
            <main className='h-screen flex justify-between flex-col pb-12'>
                  <ChatHeader />
                  <ChatSection />
            </main>
      )
}

export default ChatPage