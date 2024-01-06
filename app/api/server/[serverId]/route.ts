import { currentUser } from "@/lib/current-user";
import { deleteServer, updateServerSettings } from "@/services";
import { NextResponse } from "next/server";

interface Params {
    params: {
        serverId: string
    }
}

export async function PATCH(req: Request, { params }: Params) {
    try {
        const profile = await currentUser();

        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        const { name, imageUrl } = await req.json();

        const server = await updateServerSettings(params.serverId, profile.id, { name, imageUrl });

        return NextResponse.json(server);

    } catch (error) {
        console.log('[SERVER_ID_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const profile = await currentUser();
        const { serverId } = params

        if (!profile) return new NextResponse('Unauthorized', { status: 401 });
        if(!serverId) return new NextResponse('Server ID Missing', { status: 400 });

        const server = await deleteServer(serverId, profile.id);

        return NextResponse.json(server);

    } catch (error) {
        console.log('[SERVER_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}