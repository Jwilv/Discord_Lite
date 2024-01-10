import ChatHeader from "@/components/chat/chat-header";
import { currentUser } from "@/lib/current-user";
import { getOrCreateConversation } from "@/services/conversation-services";
import { findMemberByServerAndProfileId } from "@/services/memberServices";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  }
}

const MemberIdpage = async ({ params }: MemberIdPageProps) => {

  const profile = await currentUser();

  if (!profile) return redirectToSignIn();

  const currentMember = await findMemberByServerAndProfileId(params?.serverId, profile.id);

  if (!currentMember) return redirect('/')

  const conversation = await getOrCreateConversation(currentMember.id, params?.memberId);

  if (!conversation) return redirect(`/server/${params?.serverId}}`)

  const { memberOne, memberTwo } = conversation

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.imageUrl}
        type="conversation"
        name={otherMember.name}
        serverId={params?.serverId}
      />
    </div>
  )
}

export default MemberIdpage