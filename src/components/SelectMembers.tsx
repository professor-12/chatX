import React, { SetStateAction } from 'react'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { allUser } from '@/lib/_server/api'

interface IMembersState {
      addMembers: Array<{ id: string }>, setaddMembers: React.Dispatch<React.SetStateAction<{
            id: string;
      }[]>>
}


const SelectMembers = ({ addMembers, setaddMembers, cancel }: IMembersState & { cancel?: () => any }) => {
      const { data, isPending } = useQuery({
            queryKey: ["get-users"],
            queryFn: allUser
      })

      return (
            <div className='w-[24rem] mx-auto cursor-default bg-white space-y-4 p-4 rounded-xl border  max-w-[30rem]'>
                  <h1 className='text-lg'>Add Members</h1>
                  {
                        isPending ?  <div className="h-[30vh] flex items-center justify-center">
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
                        </div> :
                        <div className="h-[30vh] w-full space-y-4 overflow-y-auto overflow-x-hidden min-h-[30rem]">

                        {
                              data?.data?.map((user) => {
                                    return <SelectMembersCard addMembers={addMembers} setaddMembers={setaddMembers} user={user} key={user.id} />
                              })
                        }
                  </div>
                  }
                  <Button disabled={isPending} onClick={() => cancel()} className='w-full'>Done</Button>
            </div>
      )
}

export default SelectMembers

const SelectMembersCard = ({ user, addMembers, setaddMembers }: { user: any } & IMembersState) => {
      const isSelected = addMembers.findIndex((member) => member.id == user.id) > -1
      console.log(user.profile.profilePics)
      const handleAddMember = () => {
            if (isSelected) {
                  setaddMembers((prev) => prev.filter((member) => member.id != user.id))
            } else {
                  setaddMembers((prev) => [...prev, { id: user.id }])
            }
      }
      return (
            <div className='flex justify-between gap-3 items-center'>
                  <div className='flex items-center gap-2'>
                        <div>
                              <div style={{ backgroundImage: `url("${user?.profile?.profilePics}")` }} className="size-[3rem] relative bg-blue-300 overflow-hidden rounded-full ">
                              </div>
                        </div>
                  </div>

                  <div className='flex flex-1  overflow-hidden flex-col'>
                        <p className='text-lg truncate '>{user.name}</p>

                  </div>
                  <Button onClick={handleAddMember} variant='outline' className='rounded-full'>
                        {
                              isSelected ? "Added" : "Add"
                        }
                  </Button>
            </div>
      )
}