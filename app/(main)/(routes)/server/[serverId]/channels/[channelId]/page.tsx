import { currentUser } from "@/lib/current-user";

interface Props {
  params: { serverId: string, channelId: string }
}

const ChannelIdPage = async ({ params }: Props) => {

  const profile = await currentUser();

  const channel

  return (
    <div>ChannelIdPage</div>
  )
}

export default ChannelIdPage