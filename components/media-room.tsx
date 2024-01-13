"use client"

import { useEffect, useState } from 'react'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { Channel } from 'diagnostics_channel'
import { Loader2 } from 'lucide-react'
import { currentUser } from '../lib/current-user';

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export const MediaRoom = async ({
    chatId,
    video,
    audio
}: MediaRoomProps) => {

    const user = await currentUser();
    const [token, setToken] = useState('');

    useEffect(() => {

        if (!user) return

        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${user.name}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (error) {
                console.log(error)
            }
        })

    }, [user?.name, chatId])

    if (token === '') {
        <div className='flex flex-col flex-1 justify-center items-center'>
            <Loader2 className='w-7 h-7 animate-spin text-zinc-500' />
            <p className='text-xs text-zinc-500 dark:text-zinc-400 '>
                Loading...
            </p>
        </div>
    }


    return (
        <LiveKitRoom
            data-lk-theme='default'
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )

}