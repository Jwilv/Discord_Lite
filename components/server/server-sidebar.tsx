import { channelAdapter } from "@/adapters/channelAdapter";
import { currentUser } from "@/lib/current-user";
import { findRole, isMemberServer, removeMemberWithProfileId } from "@/lib/filters";
import { getServerById } from "@/services";
import { getChannelsBySerberId } from "@/services/channelServices";
import { getMembersByServerId } from "@/services/memberServices";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
    serverId: string
}

export const ServerSidebar = async ({ serverId }: Props) => {

    const profile = await currentUser();
    if (!profile) return redirectToSignIn();

    const server = await getServerById(serverId);
    if (!server) return redirect('/');
    const isMember = isMemberServer(server.members, profile.id);

    if (!isMember) return redirect('/');

    const role = findRole(server.members, profile.id);

    const channels =  channelAdapter(server.channels);

    const memebers = removeMemberWithProfileId(server.members, profile.id);


    return (
        <div
            className=" flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]"
        >
            <ServerHeader
                server={server}
            />
        </div>
    )
}