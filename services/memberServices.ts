import { db } from "@/lib/db"


export const getMembersByServerId = async (serverId: string) => {

    const members = await db.member.findMany({
        where: {
            serverId
        }
    });
    return members
}