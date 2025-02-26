"use client"
import Image from 'next/image'
import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthContext } from '@/app/provider'

function AppHeader() {
    const { user } = useAuthContext();
  return (
    <div className='p-3 flex justify-between items-center'>
        <SidebarTrigger />
        {user?.pictureURL ? (
                <Image 
                    src={user.pictureURL} 
                    alt='userImage' 
                    width={40} 
                    height={40} 
                    className='rounded-full' 
                />
            ) : (
                <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center'>
                    {/* Placeholder for user image */}
                    <span className='text-gray-500'>?</span>
                </div>
            )}
    </div>
  )
}

export default AppHeader
