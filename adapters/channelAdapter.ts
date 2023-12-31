import { Channel, ChannelType } from "@prisma/client"


export const channelAdapter = (channels: Channel[]) => {
    return {
        textChannels: channels.filter((channel) => channel.type === ChannelType.TEXT),
        audioChannels: channels.filter((channel) => channel.type === ChannelType.AUDIO),
        videoChannels: channels.filter((channel) => channel.type === ChannelType.VIDEO),
    }
}