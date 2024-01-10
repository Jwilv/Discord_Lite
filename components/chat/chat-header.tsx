import { Hash, Menu } from "lucide-react";
import { MovileToggle } from "../movile-toggle";

interface Props {
    imageUrl?: string;
    name?: string;
    type: 'channel' | 'conversation';
    serverId: string;
}

function ChatHeader({
    imageUrl,
    name,
    type,
    serverId
}: Props) {
    return (
        <div
            className="text-md font-semibold px-3 flex items-center h-12 
            border-neutral-200 dark:border-neutral-800 border-b-2"
        >
            <MovileToggle serverId={serverId} />
            {
                type === 'channel' && (
                    <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
                )
            }
            <p className="font-semibold text-md text-black dark:text-white">
                {name}
            </p>
        </div>
    )
}

export default ChatHeader