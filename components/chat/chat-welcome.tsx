import { Hash } from "lucide-react";

interface Props {
    type: 'channel' | 'conversation';
    name: string;
}

const ChatWelcome = ({ type, name }: Props) => {

    return (
        <div className="space-y-2 px-4 mb-4 ">
            {
                type === 'channel' && (
                    <div
                        className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 
                    flex items-center justify-center"
                    >
                        <Hash className="h-12 w-12 text-white" />
                    </div>

                )
            }
            <p className="text-xl md:text-3xl font-bold">
                { type === 'channel' ? `Welcome to ${name} channel` : `Welcome to ${name} conversation` }
            </p>
            <p>
                {
                    type === 'channel' ? `this is the start of the #${name} channel` : `this is start of your conversation with ${name}`
                }
            </p>
        </div>
    )
}

export default ChatWelcome