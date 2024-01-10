import { db } from "@/lib/db"


export const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
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
    } catch (error) {
        console.log("[FIND_CONVERSATION]");
        return null
    }
}

export const createConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId
            },
            include: {
                memberOne: true,
                memberTwo: true
            }
        });
    } catch (error) {
        console.log("[CREATE_CONVERSATION]");
        return null
    }
}

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {

    let conversation = await findConversation(memberOneId, memberTwoId) || await
        createConversation(memberTwoId, memberOneId);

    if (!conversation) {
        conversation = await createConversation(memberOneId, memberTwoId);
    }

    return conversation
}