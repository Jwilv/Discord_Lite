import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'
import { currentUser } from "@/lib/current-user";

interface CreateServerProps {
    name: string,
    imageUrl: string,
    profileId: string
}

export const createServer = async ({ name, imageUrl, profileId }: CreateServerProps) => {
    const server = await db.server.create({
        data: {
            name,
            imageUrl,
            inviteCode: uuidv4(),
            profileId: profileId,
            channels: {
                create: { name: "general", profileId: profileId }
            },
            members: {
                create: { profileId: profileId, role: MemberRole.ADMIN }
            }
        }
    });

    return server
}

export const getServersByUserId = async (profileId: string) => {

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId
                }
            }
        }
    });

    return servers
}

export const getServerById = async (serverId: string) => {

    const profile = await currentUser()

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile?.id
                }
            }
        }
    });

    return server
}

export const getServerChannelsById = async (serverId: string) => {
    const serverChannels = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
        },
    });

    return serverChannels
}