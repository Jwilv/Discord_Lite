"use client"

import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from '@/types';

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType?: 'channels' | 'members';
    server?: ServerWithMembersWithProfiles;
    channelType?: ChannelType;
}

export const ServerSection = ({
    label,
    role,
    sectionType,
    server,
    channelType
}: ServerSectionProps) => {

    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2 ">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {
                role !== MemberRole.GUEST && sectionType === 'channels' && (
                    <ActionTooltip label="Create Channel" side="top">
                        <button
                            onClick={() => onOpen('createChannel', { channelType })}
                            className="text-zinc-500 hover-text-zinc-600 "
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </ActionTooltip>
                )
            }
            {
                role === MemberRole.ADMIN && sectionType === 'members' && (
                    <ActionTooltip label="Manage Members" side="top">
                        <button
                            onClick={() => onOpen('manageMembers', { server })}
                            className="text-zinc-500 hover-text-zinc-600 "
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </ActionTooltip>
                )
            }
        </div>
    )
}