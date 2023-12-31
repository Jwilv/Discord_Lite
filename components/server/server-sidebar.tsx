import { getChannelsBySerberId } from "@/services/channel";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";

interface Props {
    serverId: string
}

export const ServerSidebar = async ({ serverId }: Props) => {

    const profile = await currentUser();
    if (!profile) return redirectToSignIn();

    const channels = await getChannelsBySerberId(serverId);

    const textChannels = channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = channels.filter((channel) => channel.type === ChannelType.VIDEO);


    return (
        <div>
            Server Sidebar Component
        </div>
    )
}