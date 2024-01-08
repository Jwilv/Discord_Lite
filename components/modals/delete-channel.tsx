"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"

import qs from 'query-string';

import { Title } from "@/components/modal";
import { DeleteServerModalText } from "@/constants";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';


export const DeleteChannelModal = () => {

    const { type, isOpen, onClose, data } = useModal();
    const { server, channel } = data

    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === 'deleteChannel';

    const router = useRouter();

    const onLeave = async () => {
        try {
            setIsLoading(true);

            const ulr = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(ulr);

            onClose();
            router.refresh();
            router.push(`/api/server/${server?.id}`);
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
                    {DeleteServerModalText.description}<br />
                    &nbsp;<span className="font-semibold text-rose-500">{channel?.name}</span> will be permanenty deleted.
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