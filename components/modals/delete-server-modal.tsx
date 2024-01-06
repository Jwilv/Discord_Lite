"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"


import { Title } from "@/components/modal";
import { DeleteServerModalText } from "@/constants";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';


export const DeleteServerModal = () => {

    const { type, isOpen, onClose, data, onOpen } = useModal();

    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === 'deleteServer';

    const router = useRouter();

    const onLeave = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/server/${data.server?.id}`);
            onClose();
            router.refresh();
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
                    <Title title={DeleteServerModalText.title} />
                </DialogHeader>
                <DialogDescription className="text-center text-zinc-500">
                    {DeleteServerModalText.description}<br/>
                    &nbsp;<span className="font-semibold text-rose-500">{data.server?.name}</span> will be permanenty deleted.
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