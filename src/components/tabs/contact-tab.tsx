import { allUser, createMessage } from '@/lib/_server/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ChatCard } from './chat'


const ContactTab = () => {
      const { data, isPending } = useQuery({
            queryKey: ["get-user"],
            queryFn: allUser
      })
      return (
            <div className='h-screen flex flex-col'>
                  {/* <div>Add to Contacts</div> */}
                  <div className='px-6'><input type="text" className='bg-card outline-none focus:outline-none border border-border w-full p-1 px-3' placeholder='Search..' /></div>
                  <div className='space-y-2 flex-1  scroll-hidden py-12 pt-6  overflow-y-auto'>
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
                                                data?.data?.length == 0 ? "No Contacts found" :
                                                      data?.data?.map((_data, index) => {
                                                            return <ContactCard
                                                                  key={index} contact={_data} />
                                                      })
                                          }
                                    </div>
                        }

                  </div>

            </div>
      )
}

export default ContactTab



export const ContactCard = ({ contact }: { contact: any }) => {
      return <div className='hover:bg-gradient-to-br from-slate-600/30 to-card hover:scale-100 transition-all duration-200 scale-[0.9999]  py-[0.75rem] px-2 border-border cursor-pointer  rounded-xl'>
            <div className=''>
                  <div className='flex  items-center gap-3'>
                        <img
                              src={"/file.svg"}
                              alt='avatar'
                              className='w-14 ring-[1px] border border-border h-14 rounded-full'
                        />
                        <div className='truncate'>
                              <p className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, sapiente ab dolore error sed repellendus iusto cumque laboriosam, et, eveniet tempora vitae quaerat laudantium nulla dolores minus doloribus ullam tenetur.</p>
                              <p className='font-normal text-slate-500 text-sm truncate'>{contact?.profile?.bio || "A bio"}</p>
                        </div>
                  </div>
            </div>
      </div>
}

