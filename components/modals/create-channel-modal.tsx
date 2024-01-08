"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from 'next/navigation';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'

import qs from 'query-string';


import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { createChannel } from '@/constants';

import { useModal } from '@/hooks/use-modal-store';
import { Title } from "../modal";
import { FieldInput } from "../Field";
import { ChannelType } from "@prisma/client";
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from "../ui/select";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Channel name is required'
    }).refine(name => name !== 'general',
        {
            message: 'Channel name cannot be general'
        }),
    type: z.nativeEnum(ChannelType)

})

export const CreateChannelModal = () => {

    const { isOpen, onClose, type, data } = useModal();
    const { channelType } = data;
    const isModalOpen = isOpen && type === 'createChannel';

    const router = useRouter();
    const params = useParams();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            type: channelType || ChannelType.TEXT,
        }
    });

    useEffect(() => {
        if (channelType) {
            form.setValue('type', channelType)
        }
    }, [channelType, form])


    const isLoading = form.formState.isSubmitting;

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const url = qs.stringifyUrl({
            url: '/api/channels',
            query: {
                serverId: params?.serverId
            }
        })

        await axios.post(url, values)

        form.reset();
        router.refresh();
        onClose();
    }

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={handleClose}
        >
            <DialogContent className="bg-white text-black p-0 
                overflow-hidden"
            >
                <DialogHeader className="pt-8 px-6">
                    <Title title={createChannel.title} />
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <div className='space-y-8 px-6'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FieldInput field={field} isLoading={isLoading} label={'Enter channel name'} />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Channel type</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0
                                                focus:ring-offset-0 capitalize outline-none"
                                                >
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map(type => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className="capitalize"
                                                    >
                                                        {type.toLocaleLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button
                                disabled={isLoading}
                                variant='primary'
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}