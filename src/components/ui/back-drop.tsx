"use client"
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'


const BackDrop = ({ children, className, onClick, ...props }: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }) => {
      useEffect(() => {
            document.querySelector("body")?.classList.add("overflow-hidden")
            return () => document.querySelector("body")?.classList.remove("overflow-hidden")
      }, [])
      return createPortal(<div onClick={onClick} className={clsx("inset-0 backdrop-blur-sm fixed top-0 bottom-0 left-0 right-0 z-[990990909] flex items-center justify-center w-full", className)} {...props}>
            <div className='w-auto mx-auto' onClick={(e) => { e.stopPropagation() }}>
                  {children}
            </div>
      </div>, document.getElementById("portal") as Element)


}

export default BackDrop