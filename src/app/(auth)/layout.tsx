import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
      return (
            <div className='h-screen max-sm:px-[20px]  w-full bg-background dark flex'>
                  <div className='max-lg:hidden w-[60%]'>Decoration</div>
                  {children}
            </div>
      )
}

export default Layout