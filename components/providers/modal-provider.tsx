"use client";

import { useEffect, useState } from 'react';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { InviteModal } from '@/components/modals/invite-modal';
import { EditServer } from '@/components/modals/edit-server';
import { MembersModal } from '@/components/modals/members-modal';
import { CreateChannelModal } from '@/components/modals/create-channel-modal';
import { LeaveServerModal } from '@/components/modals/leave-server-modal';

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <LeaveServerModal />
            <CreateChannelModal />
            <InviteModal />
            <CreateServerModal />
            <EditServer />
            <MembersModal />
        </>
    )

}