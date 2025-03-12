'use client'
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
  } from "@/components/ui/sidebar"

  import Image from 'next/image'
  import { Button } from '@/components/ui/button'
import { Gem, HomeIcon, LucideFileVideo, Search, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/app/provider'

  const MenuItems = [
    {
      title: 'Home', 
      url: '/dashboard', 
      icon: HomeIcon
    },
    {
      title: 'Create New Video',
      url: '/create-new-video',
      icon: LucideFileVideo
    },
    {
      title: 'Explore',
      url: '/explore',
      icon: Search
    },
    {
      title: 'Billing',
      url: '/billing',
      icon: WalletCards
    }
  ]

function AppSidebar() {
  const path = usePathname();
  const {user} = useAuthContext();
  console.log(path);
  return (
    <div>
      <Sidebar>
      <SidebarHeader>
        <div>
            <div className='flex items-center gap-2 w-full justify-center mt-5'>
                <Image src="/logo.svg" width={40} height={40} alt="Logo" />
                <h2 className='font-bold text-2xl'>FlickerForge</h2>
            </div>
            <h2 className='text-lg text-gray-400 text-center mt-2'>AI Short Video Generator</h2>
        </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
              <div className='mx-5 mt-8'>
                <Link href={'/create-new-video'}>
                  <Button className='w-full'>+ Create New Video</Button>
                </Link>
              </div>
              <SidebarMenu>
                {MenuItems.map((menu, index) => (
                  <SidebarMenuItem key={index} className='mt-3'>
                    <SidebarMenuButton isActive = {path == menu.url} className='p-5'>
                      <Link href={menu.url} className='flex items-center gap-4 p-3'>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
        <SidebarGroup/>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className='p-5 border rounded-lg mb-6 bg-gray-800'>
          <div className='flex items-center justify-between'>
            <Gem className='text-gray-400'/>
            <h2 className='text-gray-400'>{user?.credits} Credits Left</h2>
          </div>
          <Button className='w-full mt-4'>Buy More Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
    </div>
  )
}

export default AppSidebar
