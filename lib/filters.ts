import { Member } from "@prisma/client";


export const removeMemberWithProfileId  = (members: Member[], profileId: string) => {
    return members.filter(member => member.profileId !== profileId);
}