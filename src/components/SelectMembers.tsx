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
            <div className='w-[24rem] mx-auto cursor-default bg-white space-y-4 p-4 rounded-lg border  max-w-[30rem]'>
                  <h1 className='text-lg'>Add Members</h1>
                  <div className="h-[30vh] min-h-[30rem]">

                        {
                              data?.data?.map((user) => {
                                    return <SelectMembersCard addMembers={addMembers} setaddMembers={setaddMembers} user={user} key={user.id} />
                              })
                        }
                  </div>
                  <Button onClick={() => cancel()} className='w-full'>Done</Button>
            </div>
      )
}

export default SelectMembers

const SelectMembersCard = ({ user, addMembers, setaddMembers }: { user: any } & IMembersState) => {
      const isSelected = addMembers.findIndex((member) => member.id == user.id) > -1
      const handleAddMember = () => {
            if (isSelected) {
                  setaddMembers((prev) => prev.filter((member) => member.id != user.id))
            } else {
                  setaddMembers((prev) => [...prev, { id: user.id }])
            }
      }
      return (
            <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                        <div style={{ backgroundImage: `url("${user?.profile?.profilePics}")` }} className="size-[3rem] relative bg-blue-300 overflow-hidden rounded-full ">
                        </div>
                        <div className='flex flex-col'>
                              <h1 className='text-lg'>User Name</h1>
                              <p className='text-sm text-slate-500'>

                              </p>
                        </div>
                  </div>

                  <Button onClick={handleAddMember} variant='outline' className='rounded-full'>
                        {
                              isSelected ? "Added" : "Add"
                        }
                  </Button>
            </div>
      )
}