import { currentProfile } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";


export async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const profile = await currentProfile(req);
        const { content, fileUrl } = req.body;
        const { channelId, serverId } = req.query;

        if (!profile) return res.status(401).json({ error: 'Unauthorized' });
        if (!channelId) return res.status(401).json({ error: 'Channel ID missing' });
        if (!serverId) return res.status(401).json({ error: 'Server ID missing' });
        if (!content) return res.status(401).json({ error: 'Content ID missing' });

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true
            }
        });

        if (!server) return res.status(404).json({ error: 'Server not found' });

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: server.id
            }
        });

        if (!channel) return res.status(404).json({ error: 'Channel not found' });

        const memeber = await server.members.find((member) => member.profileId === profile.id);

        if (!memeber) return res.status(404).json({ error: 'Memeber not found' });

        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channel.id as string,
                memberId: memeber.id
            },
            include: {
                member: true
            }
        });

        const channelKey = `chat:${channel.id}:message`;

        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json({ message });

    } catch (error) {
        console.log('MESSAGES_POST', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}