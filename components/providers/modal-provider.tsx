"use client";

import { useEffect, useState } from 'react';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { InviteModal } from '@/components/modals/invite-modal';
import { EditServer } from '@/components/modals/edit-server';
import { MembersModal } from '@/components/modals/members-modal';
import { CreateChannelModal } from '@/components/modals/create-channel-modal';
import { LeaveServerModal } from '@/components/modals/leave-server-modal';
import { DeleteServerModal } from '@/components/modals/delete-server-modal';
import { DeleteChannelModal } from '../modals/delete-channel';
import { EditChannelModal } from '../modals/edit-channel-modal';

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <DeleteServerModal />
            <LeaveServerModal />
            <CreateChannelModal />
            <InviteModal />
            <CreateServerModal />
            <EditServer />
            <MembersModal />
            <DeleteChannelModal /> 
            <EditChannelModal /> 
        </>
    )

}