import { currentUser } from "@/lib/current-user";
import { NextResponse } from "next/server";

interface Props {
    params: {
        serverId: string
    }
}

export async function PATCH(req: Request, { params }: Props) {
    try {
        const profile = await currentUser();
        const {serverId} = params;

        if(!profile) return new NextResponse('Unauthorized', { status: 401 });
        if(!serverId) return new NextResponse('Server ID Missing', { status: 400 });
        
        

    } catch (error) {
        console.log('[SERVER_LEAVE_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}