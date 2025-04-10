"use client"
import { getContact } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useChatContext } from '@/context/ChatContext'


const ContactTab = () => {
      const { data, isPending } = useQuery({
            queryKey: ["get-user"],
            queryFn: getContact
      })
      return (
            <div className='h-screen flex flex-col'>
                  <input type="text" className='bg-card outline-none rounded-full focus:outline-none border border-border w-full p-1 px-3' placeholder='Search..' />
                  <div className='laspace-y-2 flex-1  scroll-hidden py-12 pt-6  overflow-y-auto'>
                        {
                              isPending ?
                                    <div className='flex items-center justify-center'>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide animate-spin lucide-loader"
                                          >
                                                <path d="M12 2v4" />
                                                <path d="m16.2 7.8 2.9-2.9" />
                                                <path d="M18 12h4" />
                                                <path d="m16.2 16.2 2.9 2.9" />
                                                <path d="M12 18v4" />
                                                <path d="m4.9 19.1 2.9-2.9" />
                                                <path d="M2 12h4" />
                                                <path d="m4.9 4.9 2.9 2.9" />
                                          </svg>
                                    </div>
                                    :
                                    <div className=''>
                                          {
                                                data?.data?.length == 0 ? <p className='text-center text-lg'>No Contacts found</p> :
                                                      data?.data?.map(({ contact }, index) => {
                                                            return <ContactCard
                                                                  key={contact.id + index} contact={contact} />
                                                      })
                                          }
                                    </div>
                        }

                  </div>

            </div >
      )
}

export default ContactTab

export const ContactCard = ({ contact }: { contact: any }) => {
      const { setSelectedChat } = useChatContext()
      return (
            <div onClick={() => { setSelectedChat(contact.id) }} className='hover:bg-slate-200/80  to-card hover:scale-100 cursor-pointer transition-all duration-200 scale-[0.9999]  py-[0.75rem] px-2 border-border  rounded-xl'>
                  <div className=''>
                        <div className='flex group  items-center gap-3'>
                              <img
                                    src={contact?.profile?.profilePics}
                                    className='w-14  border border-border h-14 rounded-full'
                              />
                              <div
                                    className='truncate flex-1'>
                                    <p className='truncate text-base'>{contact?.name}</p>
                                    <div className='flex items-center mr-3 justify-between flex-1'>
                                          <p className='font-normal dark:text-gray-300/40 text-secondary-foreground text-sm truncate'>{contact?.profile?.bio || "A bio"}</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
