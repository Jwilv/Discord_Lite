"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"


import { Title } from "@/components/modal";
import { inviteModal } from "@/constants";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw } from "lucide-react";


export const InviteModal = () => {

    const { type, isOpen, onClose } = useModal();

    const isModalOpen = isOpen && type === 'invite';

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 
                overflow-hidden"
            >
                <DialogHeader className="pt-8 px-6">
                    <Title title={inviteModal.title} />
                </DialogHeader>

                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        {inviteModal.description}
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black
                            focus-visible:ring-offset-0"
                            value={'invite-link'}
                        />
                        <Button size='icon'>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant='link'
                        size='sm'
                        className="text-xs text-zinc-500 mt-4"
                    >
                        Generate a new link
                        <RefreshCcw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}