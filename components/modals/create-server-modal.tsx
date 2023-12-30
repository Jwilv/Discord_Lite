"use client";

import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'


import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"

import {
    Form,
    FormField,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { initialModal } from '@/constants';

import { Title, Description } from '../modal';
import { FieldImage, FieldInput } from '../Field';

import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Server name is required'
    }),
    imageUrl: z.string().url({
        message: 'Image URL is required'
    }),

})

export const CreateServerModal = () => {

    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === 'createServer';

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
        }
    });

    const isLoading = form.formState.isSubmitting;

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await axios.post('/api/server', values)

        form.reset();
        router.refresh();
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