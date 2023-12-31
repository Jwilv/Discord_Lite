import { Member } from "@prisma/client";


export const removeMemberWithProfileId = (members: Member[], profileId: string) => {
    return members.filter(member => member.profileId !== profileId);
}

export const isMemberServer = (members: Member[], profileId: string) => {
    return members.some(member => member.profileId === profileId);
}

export const findRole = (members: Member[], profileId: string) => {
    return members.find(member => member.profileId === profileId)?.role
}