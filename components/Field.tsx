import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { FileUpload } from "./file-upload"
import { Input } from "./ui/input"

interface FieldImageProps {
    field: any, 
    endpoint: "serverImage" | "messageFile"
}

export const FieldImage = ({ field, endpoint }: FieldImageProps) => {
    return (
        <FormItem>
            <FormControl>
                <FileUpload
                    endpoint={endpoint}
                    value={field.value}
                    onChange={field.onChange}
                />
            </FormControl>
        </FormItem>
    )
}

interface FieldInputProps {
    field: any
    isLoading: boolean
    label: string
}

export const FieldInput = ({ field, isLoading, label }: FieldInputProps) => {
    return (
        <FormItem>

            <FormLabel
                className='uppercase text-xs font-bold text-zinc-500
                    dark:text-secondary/70'
            >
                {label}
            </FormLabel>

            <FormControl>
                <Input
                    disabled={isLoading}
                    className='bg-zinc-300/50 border-0 focus-visible:ring-0
                    text-black focus-visible:ring-offset-0'
                    placeholder={`Enter ${label}`}
                    {...field}
                />
            </FormControl>

            <FormMessage />
        </FormItem>
    )
}