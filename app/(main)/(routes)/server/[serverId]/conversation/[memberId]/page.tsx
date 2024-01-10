import { currentUser } from "@/lib/current-user";
import { findMemberByServerAndProfileId } from "@/services/memberServices";
import { redirectToSignIn } from "@clerk/nextjs";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  }
}

const MemberIdpage = async({ params}: MemberIdPageProps) => {

  const profile = await currentUser();

  if (!profile) return redirectToSignIn();

  const member = await findMemberByServerAndProfileId(params.serverId, profile.id);


  return (
    <div>MemberIdpage</div>
  )
}

export default MemberIdpage