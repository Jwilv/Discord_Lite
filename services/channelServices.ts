import { channelAdapter } from "@/adapters/channelAdapter";
import { db } from "@/lib/db"
import { ChannelType, MemberRole } from "@prisma/client";


export const getChannelsByServerId = async (serverId: string) => {

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

export const getChannelById = async (id : string) => {
    const channel = await db.channel.findUnique({
        where: {
            id
        }
    });

    return channel
 }

interface CreateChannelProps {
    serverId: string
    name: string
    type: ChannelType
    profileId: string
}

export const createChannel = async ({ serverId, name, type, profileId }: CreateChannelProps) => {

    const server = await db.server.update({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId,
                    role: {
                        in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                    }
                }
            }
        },
        data: {
            channels: {
                create: {
                    profileId,
                    name,
                    type,
                }
            }
        }
    });

    return server
}

interface deleteProps {
    serverId: string;
    channelId: string;
    profileId: string;
}

export const deleteChannel = async ({ serverId, channelId, profileId }: deleteProps) => {

    const server = await db.server.update({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId,
                    role: {
                        in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                    }
                }
            }
        },
        data: {
            channels: {
                delete: {
                    id: channelId
                }
            }
        }
    });

    return server
}

interface updateProps extends deleteProps {
    name: string
    type: ChannelType
}

export const updateChannel = async ({
    channelId,
    serverId,
    profileId,
    name,
    type }: updateProps) => {

    const server = db.server.update({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId,
                    role: {
                        in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                    }
                }
            }
        },
        data: {
            channels: {
                update: {
                    where: {
                        id: channelId,
                        name: {
                            not: 'general'
                        }
                    },
                    data: {
                        name,
                        type,
                    }
                }
            }
        }
    });

    return server
}

export const getGeneralChannel = async (serverId: string, profileId: string) => {
    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId,
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: 'general',
                    type: ChannelType.TEXT
                }
            }
        }
    });

    return server
}