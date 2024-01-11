import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentUser } from "@/lib/current-user";
import { getChannelById } from "@/services";
import { getMember } from "@/services/memberServices";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: { serverId: string, channelId: string }
}

const ChannelIdPage = async ({ params }: Props) => {

  const profile = await currentUser();

  const channel = await getChannelById(params.channelId);
  const member = await getMember(params.serverId, profile?.id!);

  if (!profile) return redirectToSignIn();

  if (!channel || !member) return redirect('/');

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <div className="flex-1">Future Messages</div>
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
}

export default ChannelIdPage