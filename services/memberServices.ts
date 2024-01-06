import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client";


export const getMembersByServerId = async (serverId: string) => {

    const members = await db.member.findMany({
        where: {
            serverId
        }
    });
    return members
}

interface UpdateRolProps {
    serverId: string
    memberId: string
    role: MemberRole,
    profileId: string,
}

export const updateRolMemberServer = async ({ serverId, profileId, memberId, role }: UpdateRolProps) => {
    const server = await db.server.update({
        where: {
            id: serverId,
            profileId
        },
        data: {
            members: {
                update: {
                    where: {
                        id: memberId,
                        profileId: {
                            not: profileId
                        }
                    },
                    data: { role }
                }
            }
        },
        include: {
            members: true,
        }
    });

    return server
}

interface deleteMemberProps {
    serverId: string
    memberId: string
    profileId: string,
}

export const deleteMemberFromServer = async ({ serverId, profileId, memberId }: deleteMemberProps) => {
    const server = await db.server.update({
        where: {
            id: serverId,
            profileId
        },
        data: {
            members: {
                delete: {
                    id: memberId,
                    profileId: {
                        not: profileId
                    }
                }
            }
        },
        include: {
            members: true
        }
    });

    return server
}


interface LeaveMemberProps {
    serverId: string
    profileId: string
}

export const leaveMemberServer = async ({ serverId, profileId }: LeaveMemberProps) => {
    const server = await db.server.update({
        where: {
            id: serverId,
            profileId: {
                not: profileId
            },
            members: {
                some: {
                    profileId
                }
            }
        },
        data: {
            members: {
                deleteMany: {
                    profileId
                }
            }
        }
    });

    return server
}