import { getContact, getUser } from '@/lib/_server/api'
import React from 'react'

const Chat = async () => {
      const { data } = await getContact()
      console.log(data)
      return (
            <div>
                  <div className='flex justify-between items-center'>
                        <h1 className='text-2xl text-left'>Chats</h1>
                  </div>
                  <div>
                        {data?.map((contact: any) => (
                              <div key={contact.id} className='flex items-center justify-between p-4 border-b'>
                                    <div className='flex items-center'>
                                          <img
                                                src={contact.user.avatar}
                                                alt='avatar'
                                                className='w-12 h-12 rounded-full'
                                          />
                                          <div className='ml-4'>
                                                <h1 className='text-lg'>{contact.user.username}</h1>
                                                <p className='text-sm text-gray-400'>{contact.lastMessage}</p>
                                          </div>
                                    </div>
                                    <p className='text-sm text-gray-400'>{contact.time}</p>
                              </div>
                        ))}
                  </div>
                  add
            </div>
      )
}

export default Chat