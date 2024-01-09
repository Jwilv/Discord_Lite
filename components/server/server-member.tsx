"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Server } from "@prisma/client"
import { ShieldAlert, ShieldCheck } from "lucide-react"
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";


interface ServerMemberProps {
    server: Server,
    member: Member,
}

const iconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-5 ml-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-5 ml-2 text-rose-500" />,
}

export const ServerMember = ({ server, member }: ServerMemberProps) => {

    const roleIcon = iconMap[member.role];

    const params = useParams();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/server/${server.id}/conversation/${member.id}`);
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover-700/50 transition mb-1",
                params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            <UserAvatar
                src={member.imageUrl}
                className="h-8 w-8 md:h-8 md:w-8"
            />
            <p
            className={cn(
                "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600",
                "dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.memberId === member.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
            )}
            >
                {member.name}
            </p>
            {roleIcon}
        </button>
    )
}