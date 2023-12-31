import { getChannelsBySerberId } from "@/services/channel";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

interface Props {
    serverId: string
}

export const ServerSidebar = async ({ serverId }: Props) => {

    const profile = await currentUser();
    if (!profile) return redirectToSignIn();

    const channels = await getChannelsBySerberId(serverId);

    return (
        <div>
            Server Sidebar Component
        </div>
    )
}