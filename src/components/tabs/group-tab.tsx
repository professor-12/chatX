"use client"
import { useTabContext } from '@/context/TabContext'
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { createGroup } from '@/lib/_server/api'
import { useChatContext } from '@/context/ChatContext'
import useToggle from '@/hooks/useToggle'
import BackDrop from '../ui/back-drop'
import SelectMembers from '../SelectMembers'


const GroupChat = () => {
      const { lastChatQuery } = useChatContext()
      const { mutate: _createGroup, isPending } = useMutation({ mutationFn: createGroup, mutationKey: ['create-group'], onSuccess: handleOnSucess, onError: (errpr) => { console.log("Error") } })
      const { setSelectedChat } = useChatContext()
      const [isOpened, onclick] = useToggle()
      const [addMembers, setaddMembers] = useState<Array<{ id: string }>>([])

      const fileRef = useRef<HTMLInputElement>(null)
      const [groupName, setGroupName] = useState("")
      const [fileString, setFileString] = useState("")
      const { changeActiveTab } = useTabContext()

      const convertFileToString = async (file: Blob) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            return new Promise((resolve, reject) => {
                  if (fileReader.error) {
                        reject(fileReader.result.toString())
                  }
                  fileReader.onloadend = () => {
                        resolve(fileReader.result)
                  }
            })
      }
      const _handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files.length == 0) return
            const stringFile = await convertFileToString(e.target.files[0])
            setFileString(stringFile as string)

            return stringFile
      }

      function handleOnSucess(data: any) {
            setSelectedChat(() => ({ id: data, isGroup: true }))
            lastChatQuery.refetch()
            changeActiveTab("home")
      }
      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            _createGroup({ name: groupName, description: "", groupPics: fileString as string, members: addMembers })
      }
      return (
            <form onSubmit={handleSubmit}>
                  <div onClick={() => { changeActiveTab("home") }} className='flex group items-center gap-2 cursor-pointer hover:bg-slate-300/30 p-1 rounded-full px-4'><Arror /> Cancel</div>
                  <div className='p-2 py-3'>
                        <div className='flex items-center gap-2'>
                              <div className="size-[5rem] relative bg-blue-300 overflow-hidden rounded-full ">
                                    {
                                          fileString ? <Image src={fileString as string} alt="Profile Pics" className='w-full h-full' height={500} width={600} /> :
                                                <>
                                                      <input accept='image/*' onChange={_handleFileUpload} name="group" ref={fileRef} type="file" className='hidden' id="group-pics" />
                                                      <label htmlFor="group-pics" className='absolute cursor-pointer inset-0 flex justify-center items-center'>
                                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M864 248H728l-32.4-90.8a32.07 32.07 0 0 0-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"></path></svg>
                                                      </label>
                                                </>
                                    }
                              </div>
                              <div className='flex-1'>
                                    <Input onChange={e => setGroupName(e.target.value)} className='rounded-full w-full ' placeholder='Group Name' />
                              </div>
                        </div>
                  </div>
                  {
                        isOpened &&
                        (<BackDrop onClick={onclick} className='bg-slate-900/30 cursor-pointer'>
                              <SelectMembers cancel={() => onclick()} addMembers={addMembers} setaddMembers={setaddMembers} />
                        </BackDrop>)
                  }
                  <hr className='h-px my-4 w-full bg-slate-200' />
                  <div className="space-y-4">

                        <Button type='button' onClick={onclick} variant='ghost' className='w-full'>Add members {"(" + addMembers.length + ")"}</Button>
                        <Button disabled={isPending || (groupName.trim().length == 0) || !fileString || addMembers.length == 0} className='w-full'>Create group</Button>
                  </div>
            </form>
      )
}

export default GroupChat






const Arror = (props: any) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide group: lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>)