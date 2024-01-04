import { db } from '@/lib/db'
import { MemberRole, Profile } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'
import { currentUser } from "@/lib/current-user";
import { serialize } from 'v8';

interface CreateServerProps {
    name: string,
    imageUrl: string,
    profile: Profile
}

export const getFirstServerByProfileId = async (profileId: string) => {
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId
                }
            }
        }
    });
    return server
}



export const createServer = async ({ name, imageUrl, profile }: CreateServerProps) => {
    const server = await db.server.create({
        data: {
            name,
            imageUrl,
            inviteCode: uuidv4(),
            profileId: profile.id,
            channels: {
                create: { name: "general", profileId: profile.id }
            },
            members: {
                create: {
                    profileId: profile.id,
                    role: MemberRole.ADMIN,
                    name: profile.name,
                    imageUrl: profile.imageUrl,
                }
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
        },
        include: {
            members: true,
            channels: true,
        }
    });

    return server
}

export const updateServeInviteById = async (serverId: string, profile: Profile) => {

    const server = await db.server.update({
        where: {
            id: serverId,
            profileId: profile.id
        },
        data: {
            inviteCode: uuidv4(),
        },
    })

    return server
}

export const existingServer = async (inviteCode: string, profileId: string) => {

    const server = await db.server.findFirst({
        where: {
            inviteCode: inviteCode,
            members: {
                some: {
                    profileId
                }
            }
        },
    });

    return server
}

export const joinWithInviteCode = async (inviteCode: string, profile: Profile) => {
    const server = await db.server.update({
        where: {
            inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                        role: MemberRole.GUEST,
                        name: profile.name,
                        imageUrl: profile.imageUrl,
                    }
                ]
            }
        }
    });

    return server
}

interface UpdateSettingsProps {
    name: string,
    imageUrl: string
}

export const updateServerSettings = async (
    serverId: string,
    profileId: string,
    data: UpdateSettingsProps
) => {
    const server = await db.server.update({
        where: {
            id: serverId,
            profileId,
        },
        data: { ...data }
    });

    return server
}