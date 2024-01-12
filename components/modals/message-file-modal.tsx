"use client";

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
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
    FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react';
import { FileUpload } from '../file-upload';
import { useRouter } from 'next/navigation';
import { Title, Description } from '../modal';
import { FieldImage, FieldInput } from '../Field';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
    fileUrl: z.string().url({
        message: 'attachment is required'
    }),

})

export const MessageFileModal = () => {

    const router = useRouter();

    const { isOpen, type, onClose, data } = useModal();
    const { query, apiUrl } = data

    const open = isOpen && type === 'messageFile'


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: '',
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const url = qs.stringifyUrl({
            url: apiUrl || '',
            query,
        })
        await axios.post(url, {
            ...values,
            content: values.fileUrl
        })

        form.reset();
        router.refresh();
        handleClose();
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 
                overflow-hidden"
            >
                <DialogHeader className="pt-8 px-6">
                    <Title title={'add a attachment'} />
                    <Description description={'send a file as a message'} />
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <div className='space-y-8 px-6'>
                            <div className='flex items-center justify-center text-center'>
                                <FormField
                                    control={form.control}
                                    name='fileUrl'
                                    render={({ field }) => (
                                        <FieldImage field={field} endpoint="messageFile" />
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button
                                disabled={isLoading}
                                variant='primary'
                            >
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}