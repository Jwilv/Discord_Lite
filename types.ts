import { Channel, Member, Profile, Server } from "@prisma/client"

export type ServerWithMembersWhithProfiles = Server & {
    members: Member[]
}
