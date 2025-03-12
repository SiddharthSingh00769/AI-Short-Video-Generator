'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuthContext } from '@/app/provider';

function VideoList() {
    const [videoList, setVideoList] = useState([]);

    const convex = useConvex();
    const {user} = useAuthContext();

    useEffect(() => {
        user&&GetUserVideoList();
    }, [user])

    const GetUserVideoList = async() => {
        //Fetch all user videos
        const result = await convex.query(api.videoData.GetUserVideos, {
            uid: user?._id
        })
        setVideoList(result);
        console.log(result);
    }

    return (
        <div>
            {videoList?.length == 0 ?
            <div className='flex flex-col items-center justify-center mt-20 gap-4 p-5 border border-dashed rounded-xl py-16'>
                <Image src={'/logo.svg'} alt='logo' width={60} height={60} />
                <h2 className='text-gray-400 text-lg'>You don't have any video created. Create a one now!!</h2>
                <Link href={'/create-new-video'}>
                    <Button>+ Create New Video</Button>
                </Link>
            </div>
            :
            <div>
                {videoList.map((video, index) => {
                    <div>
                        <Image src={video?.images[0]} 
                        alt={video?.title} 
                        width={500} height={500}
                        />
                    </div>
                })}
            </div>
            }
        </div>
    )
}

export default VideoList
