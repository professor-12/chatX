"use client"
import React from 'react'
import { links, Svgs } from '../side-nav';
import { useTabContext } from '@/context/TabContext';

const MobileNav = () => {
      const { activeTab, changeActiveTab } = useTabContext()
      return (
            <>
                  <footer className='fixed bottom-0 left-0 transition-all flex  p-3'>
                        <div className='rounded-full backdrop-blur-sm mx-auto'>
                              <ul className='gap-1 p-3 backdrop-blur-sm   bg-slate-300/50 rounded-full px-5  mx-auto items-center flex'>
                                    {
                                          new Array(4).fill(null).map((_, index) => {
                                                const link = links[index].href.split("/")[2] || "home"
                                                const isActive = (link) === (activeTab || "home");
                                                return (
                                                      <div onClick={() => { changeActiveTab(link) }} key={index} className='relative group'>
                                                            <li key={index} className={`dark:text-white/60 ${isActive && "bg-primary/10"} duration-100 transition-all  p-3 hover:bg-primary/20 text-primary cursor-pointer rounded-xl`}>
                                                                  {Svgs[index]}
                                                            </li>
                                                            <div className='absolute  -top-12 duration-200 transition-all hidden group-hover:inline rounded-lg p-2 min-w-[12px] dark:bg-white bg-card shadow border dark:text-slate-200 text-sm text-black font-medium z-[12] capitalize'>{links[index].href.split("/")[2] ?? "Home"}</div>
                                                      </div>
                                                )
                                          })
                                    }
                              </ul></div>
                  </footer>
            </>
      )
}

export default MobileNav