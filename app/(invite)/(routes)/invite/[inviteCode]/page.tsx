import { currentUser } from "@/lib/current-user"
import { existingServer, joinWithInviteCode } from "@/services";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: { inviteCode: string }
}

const InviteCodePage = async ({ params }: Props) => {

  const profile = await currentUser();

  if(!profile) return redirectToSignIn();

  const existProfileInServer = await existingServer(params.inviteCode, profile.id);

  if (existProfileInServer) return redirect(`/server/${existProfileInServer.id}`);

  const joinMember = await joinWithInviteCode(params.inviteCode, profile);

  if (joinMember) return redirect(`/server/${joinMember.id}`);

  return null
}

export default InviteCodePage