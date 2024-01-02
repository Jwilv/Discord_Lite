import { currentUser } from "@/lib/current-user";
import { updateServeInviteById } from "@/services";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {

        const profile = await currentUser();

        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!profile) return new NextResponse("Server ID Missing", { status: 400 });

        const server = await updateServeInviteById(params.serverId, profile);

        return NextResponse.json(server);

    } catch (error) {
        console.log('[SERVER_ID]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}