import { removeMemberWithProfileId } from "@/lib/filters";
import { getChannelsBySerberId } from "@/services/channelServices";
import { getMembersByServerId } from "@/services/memberServices";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

interface Props {
    serverId: string
}

export const ServerSidebar = async ({ serverId }: Props) => {

    const profile = await currentUser();
    if (!profile) return redirectToSignIn();

    const channels = await getChannelsBySerberId(serverId);

    const serverMembers = await getMembersByServerId(serverId);
    const memebers = removeMemberWithProfileId(serverMembers, profile.id);


    return (
        <div>
            Server Sidebar Component
        </div>
    )
}