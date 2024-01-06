"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"


import { Title } from "@/components/modal";
import { LeaveModalText } from "@/constants";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';


export const LeaveServerModal = () => {

    const { type, isOpen, onClose, data, onOpen } = useModal();

    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === 'leaveServer';

    const router = useRouter();

    const onLeave = async () => {
        try {
            setIsLoading(true);

            await axios.patch(`/api/server/${data.server?.id}/leave`);
            onClose();
            router.refresh();
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);

        }

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 
                overflow-hidden"
            >
                <DialogHeader className="pt-8 px-6">
                    <Title title={LeaveModalText.title} />
                </DialogHeader>
                <DialogDescription className="text-center text-zinc-500">
                    {LeaveModalText.description}&nbsp;<span className="font-semibold text-indigo-500">{data.server?.name}</span>?
                </DialogDescription>

                <DialogFooter className="gb-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant='ghost'
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onLeave}
                            variant='primary'
                        >
                            Confirm
                        </Button>
                    </div>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}