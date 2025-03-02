import React, { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
      return (
            <div className='w-full flex h-screen  overflow-hidden relative'>
                  {/* Side nav */}
                  <div className='h-full w-[80px]   bg-accent dark:bg-accent/45 border-r'></div>

                  {/* Users */}
                  <div className='h-full flex-1 bg-card border-r'></div>
                  <div className='h-full flex-[3] bg-card border-r'>
                        {children}
                  </div>
            </div>
      )
}

export default Layout