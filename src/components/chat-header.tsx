import React from 'react'

const ChatHeader = () => {
      return (
            <div className='sticky h-16 flex px-5 items-center bg-accent/50 border-border border-b top-0'>
                  {/* Profile */}
                  <div className='flex gap-4 items-center'>
                        <div className='h-10 aspect-square rounded-full bg-green-300'></div>
                        <p className='text-xl font-medium'>Emmanuel</p>
                  </div>

            </div>
      )
}

export default ChatHeader 