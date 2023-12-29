"use client";

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import axios from 'axios'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
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
import { initialModal } from '@/constants';
import { FieldImage, FieldInput } from '../Field';

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Server name is required'
    }),
    imageUrl: z.string().url({
        message: 'Image URL is required'
    }),

})

export const InitialModal = () => {

    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await axios.post('/api/server', values)

        form.reset();
        router.refresh();
        window.location.reload();
    }

    if (!isMounted) return null

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 
                overflow-hidden"
            >
                <DialogHeader className="pt-8 px-6">
                    <Title title={initialModal.title} />
                    <Description description={initialModal.description} />
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
                                    name='imageUrl'
                                    render={({ field }) => (
                                        <FieldImage field={field} endpoint="serverImage" />
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FieldInput field={field} isLoading={isLoading} label={'Server name'} />
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