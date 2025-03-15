import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
      return (
            <div className='h-screen max-sm:px-[20px]  w-full bg-background  flex'>
                  <div className='max-lg:hidden w-[60%] relative'>
                        <div className='bg-[url("/omo.jpg")] bg-cover bg-[60%] left-0 w-full h-full absolute right-0  top-0 bottom-0'></div>
                  </div>
                  {children}
            </div>
      )
}

export default Layout