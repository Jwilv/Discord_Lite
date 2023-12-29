import { DialogTitle } from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'


export const Title = ({ title }: { title: string }) => {
    return (
        <DialogTitle className="text-center text-2xl font-bold">
            {title}
        </DialogTitle>
    )
}

export const Description = ({ description }: { description: string }) => {
    return (
        <DialogDescription className="text-center text-zinc-500">
            {description}
        </DialogDescription>
    )
}