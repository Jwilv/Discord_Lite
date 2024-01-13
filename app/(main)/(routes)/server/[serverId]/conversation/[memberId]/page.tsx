import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
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
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      <ChatHeader
        imageUrl={otherMember.imageUrl}
        type="conversation"
        name={otherMember.name}
        serverId={params?.serverId}
      />
      <ChatMessages
        name={otherMember.name}
        member={currentMember}
        chatId={conversation.id}
        type="conversation"
        apiUrl="/api/direct-messages"
        paramKey="conversationId"
        paramValue={conversation.id}
        socketUrl="/api/socket/direct-messages"
        socketQuery={{ conversationId: conversation.id }}
      />
      <ChatInput
        name={otherMember.name}
        type="conversation"
        apiUrl="/api/socket/direct-messages"
        query={{ conversationId: conversation.id }}
      />
    </div>
  )
}

export default MemberIdpage