import { useChatContext } from '@/context/ChatContext';
import { sendMessage } from '@/lib/_server/api';
import React from 'react'
import ChatContainer from './chat-container';

const ChatSection = () => {
      const { selectedChat: id, chats } = useChatContext()
      return (
            <>
                  <ChatContainer chats={chats} />
                  <div className='h-12 px-2 bg-secondary mx-3 flex rounded-full overflow-hidden'>
                        <form onSubmit={async (e) => {
                              const formData = new FormData(e.currentTarget)
                              e.preventDefault();
                              console.log(formData.get("name"))
                              await sendMessage({ receiverId: id as string, message: formData.get("name") as string })
                        }}>
                              <input type="text" name='name' className='h-full flex-1 bg-transparent focus:outline-none border-none outline-none' />
                        </form>
                  </div>
            </>
      )
}

export default ChatSection