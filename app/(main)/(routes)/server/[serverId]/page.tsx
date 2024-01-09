import { currentUser } from "@/lib/current-user";
import { getGeneralChannel } from "@/services";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: { serverId: string }
}

const PageServerId = async ({ params }: Props) => {

  const profile = await currentUser();
  if (!profile) return redirectToSignIn();

  const server = await getGeneralChannel(params.serverId, profile.id);

  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== 'general') return null

  return redirect(`/server/${params.serverId}/channels/${initialChannel.id}`)
}

export default PageServerId