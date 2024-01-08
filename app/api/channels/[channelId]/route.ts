import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { deleteChannel } from "@/services/channelServices";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentUser();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');

        if (!profile) return new NextResponse('Unauthorized', { status: 401 });
        if (!serverId) return new NextResponse('Server ID Missing', { status: 400 });
        if (!params.channelId) return new NextResponse('Channel ID Missing', { status: 400 });

        const server = await deleteChannel({
            serverId,
            channelId: params.channelId,
            profileId: profile.id
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[CHANNELS_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}