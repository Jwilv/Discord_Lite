import { db } from '@/lib/db'

export const getServerByProfileId = async (profileId: string) => {
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId
                },
            },
        },
    });
    return server
}