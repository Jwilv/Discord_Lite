import { channelAdapter } from "@/adapters/channelAdapter";
import { currentUser } from "@/lib/current-user";
import { findRole, isMemberServer, removeMemberWithProfileId } from "@/lib/filters";
import { getServerById } from "@/services";
import { getChannelsBySerberId } from "@/services/channelServices";
import { getMembersByServerId } from "@/services/memberServices";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface Props {
    serverId: string
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-indigo-500" />,
}

export const ServerSidebar = async ({ serverId }: Props) => {

    const profile = await currentUser();
    if (!profile) return redirectToSignIn();

    const server = await getServerById(serverId);
    if (!server) return redirect('/');
    const isMember = isMemberServer(server.members, profile.id);

    if (!isMember) return redirect('/');

    const role = findRole(server.members, profile.id);

    const channels = channelAdapter(server.channels);

    const members = removeMemberWithProfileId(server.members, profile.id);


    return (
        <div className=" flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea className="flex-1 px-3">
                <div className="m-2">
                    <ServerSearch data={[
                        {
                            label: 'Text Channels',
                            type: 'channel',
                            data: channels.textChannels.map((channel) => {
                                return {
                                    icon: iconMap[channel.type],
                                    name: channel.name,
                                    id: channel.id
                                }
                            }),
                        },
                        {
                            label: 'Voice Channels',
                            type: 'channel',
                            data: channels.audioChannels.map((channel) => {
                                return {
                                    icon: iconMap[channel.type],
                                    name: channel.name,
                                    id: channel.id
                                }
                            }),
                        },
                        {
                            label: 'Video Channels',
                            type: 'channel',
                            data: channels.videoChannels.map((channel) => {
                                return {
                                    icon: iconMap[channel.type],
                                    name: channel.name,
                                    id: channel.id
                                }
                            }),
                        },
                        {
                            label: 'Members',
                            type: 'member',
                            data: members.map((member) => {
                                return {
                                    icon: roleIconMap[member.role],
                                    name: member.name,
                                    id: member.id
                                }
                            }),
                        },
                    ]} />
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounende-md my-2" />
                {
                    !!channels.textChannels.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Text Channels"
                                sectionType={"channels"}
                                channelType={ChannelType.TEXT}
                                role={role}
                            />
                            <div className="spacec-y-[2px]">

                                {
                                    channels.textChannels.map((channel) => (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            server={server}
                                            role={role}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    !!channels.audioChannels.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Voice Channels"
                                sectionType={"channels"}
                                channelType={ChannelType.AUDIO}
                                role={role}
                            />
                            <div className="spacec-y-[2px]">

                                {
                                    channels.audioChannels.map((channel) => (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            server={server}
                                            role={role}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    !!channels.videoChannels.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Video Channels"
                                sectionType={"channels"}
                                channelType={ChannelType.VIDEO}
                                role={role}
                            />
                            <div className="spacec-y-[2px]">

                                {
                                    channels.videoChannels.map((channel) => (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            server={server}
                                            role={role}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    !!members.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Members"
                                sectionType={"members"}
                                role={role}
                                server={server}
                            />
                            <div className="spacec-y-[2px]">
                                {
                                    members.map((member) => (
                                        <ServerMember
                                            member={member}
                                            server={server}
                                            key={member.id}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

            </ScrollArea>
        </div>
    )
}