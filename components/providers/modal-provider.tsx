"use client";

import { useEffect, useState } from 'react';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { InviteModal } from '../modals/invite-modal';
import { EditServer } from '../modals/edit-server';

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <InviteModal />
            <CreateServerModal />
            <EditServer />
        </>
    )

}