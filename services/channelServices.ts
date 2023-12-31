import { db } from "@/lib/db"
import { ChannelType } from "@prisma/client";


export const getChannelsBySerberId = async (serverId: string) => {

    const channels = await db.channel.findMany({
        where: {
            serverId
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return {
        textChannels: channels.filter((channel) => channel.type === ChannelType.TEXT),
        audioChannels: channels.filter((channel) => channel.type === ChannelType.AUDIO),
        videoChannels: channels.filter((channel) => channel.type === ChannelType.VIDEO),
    }
}