"use client"
import React, { use } from 'react'
import { links, Svgs } from '../side-nav';
import { useTabContext } from '@/context/TabContext';
import useToggle from '@/hooks/useToggle';
import useDarkMode from '@/hooks/use-darkmode';

const MobileNav = () => {
      const { activeTab, changeActiveTab } = useTabContext()
      const { dark, toggle } = useDarkMode()
      return (
            <>
                  <footer className='fixed bottom-0 left-0 z-[42245]   transition-all flex  p-3'>
                        <div className=' mx-auto'>
                              <ul className='gap-1 p-3 backdrop-blur-sm   bg-slate-300/10 backdrop:blur-sm z-[66666] rounded-full px-5  mx-auto items-center flex'>
                                    {
                                          new Array(4).fill(null).map((_, index) => {
                                                const link = links[index].href.split("/")[2] || "home"
                                                const isActive = (link) === (activeTab || "home");
                                                return (
                                                      <div onClick={() => { changeActiveTab(link) }} key={index} className='relative group'>
                                                            <li key={index} className={`dark:text-white/60 ${isActive && "bg-primary/10"} duration-100 transition-all  p-3 hover:bg-primary/20 text-primary cursor-pointer rounded-xl`}>
                                                                  {Svgs[index]}
                                                            </li>
                                                            <div className='absolute  -top-12 duration-200 transition-all hidden group-hover:inline rounded-lg p-2 min-w-[12px] dark:bg-white bg-card shadow border dark:text-black text-sm text-black font-medium z-[12] capitalize'>{links[index].href.split("/")[2] ?? "Home"}</div>
                                                      </div>

                                                )
                                          })
                                    }
                              </ul>
                        </div>
                  </footer>
            </>
      )
}

export default MobileNav


export const SmallNav = () => {
      const { activeTab, changeActiveTab } = useTabContext()
      const { dark, toggle } = useDarkMode()
      return (<footer className='pb-1'>
            <div className='backdrop-blur-sm  mx-auto'>
                  <ul className='gap-1 p-2 backdrop-blur-sm w-[60%]  rounded-full   px-5  mx-auto items-center justify-between flex'>
                        {
                              new Array(4).fill(null).map((_, index) => {
                                    const link = links[index].href.split("/")[2] || "home"
                                    const isActive = (link) === (activeTab || "home");
                                    return (
                                          <div onClick={() => { changeActiveTab(link) }} key={index} className='relative group'>
                                                <li key={index} className={`dark:text-white/60 ${isActive && "bg-primary/10"} duration-100 transition-all  p-3 hover:bg-primary/20 text-primary cursor-pointer rounded-xl`}>
                                                      {Svgs[index]}
                                                </li>
                                                <div className='absolute  -top-12 duration-200 transition-all hidden group-hover:inline rounded-lg p-2 min-w-[12px] dark:bg-white bg-card shadow border  text-sm text-black font-medium z-[12] capitalize'>{links[index].href.split("/")[2] ?? "Home"}</div>
                                          </div>
                                    )
                              })
                        }
                        <li onClick={toggle} className={'p-3 group dark:text-white/60 text-primary cursor-pointer rounded-xl'}>
                              {
                                    dark ?
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                          :
                                          Svgs[Svgs.length - 2 + 0]
                              }
                              <div className='absolute  -top-12 duration-200 transition-all hidden group-hover:inline rounded-lg p-2 min-w-[12px] dark:bg-white bg-card shadow border  text-sm text-black font-medium z-[12] capitalize'>
                                    {dark?"Dark mode": "Light mode"}
                              </div>
                        </li>
                  </ul></div>
      </footer>)
}