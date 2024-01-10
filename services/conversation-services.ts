import { db } from "@/lib/db"


export const findConversation = async (memberOneId: string, memberTwoId: string) => {
    const conversation = await db.conversation.findFirst({
        where: {
            AND: [
                { memberOneId },
                { memberTwoId }
            ]
        },
        include: {
            memberOne: true,
            memberTwo: true,
        }
    });

    return conversation
}