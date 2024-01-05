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

export const updateRolMemberServer = async ({ serverId, profileId, memberId, role} : UpdateRolProps) => {
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
        }
    });

    return server
}