import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'

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