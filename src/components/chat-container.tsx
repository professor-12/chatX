import React from 'react'

const ChatContainer = ({ chats }: { chats: Array<any> }) => {
      console.log(chats)
      return (
            <section className='flex flex-col p-4 flex-grow  justify-end gap-3'>
                  {
                        chats.map((chat, key) => {
                              return <ChatCard chat={chat} key={key} />
                        })
                  }
                  {
                        chats.map((chat, key) => {
                              return <ChatCard chat={chat} key={key} />
                        })
                  }
                  {
                        chats.map((chat, key) => {
                              return <ChatCard chat={chat} key={key} />
                        })
                  }
                  {
                        chats.map((chat, key) => {
                              return <ChatCard chat={chat} key={key} />
                        })
                  }
            </section>
      )
}

export default ChatContainer


const ChatCard = ({ chat }: { chat: any }) => {
      console.log(chat)
      return <div className='py-1 w-full  flex justify-end'>
            <div>

                  <div className='bg-white text-black max-w-[20rem]  h-auto text-wrap leading-6 p-2 px-4 rounded-lg rounded-br-none'>{chat?.message}
                        Lorem ipsum dolor sit ame
                  </div>
                  <span className='text-right float-right text-sm text-muted-foreground text-pretty'>{new Intl.DateTimeFormat().format(new Date())}</span>
            </div>
      </div>
}