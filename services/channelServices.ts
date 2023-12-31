import { channelAdapter } from "@/adapters/channelAdapter";
import { db } from "@/lib/db"


export const getChannelsBySerberId = async (serverId: string) => {

    const channels = await db.channel.findMany({
        where: {
            serverId
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return channelAdapter(channels)
}