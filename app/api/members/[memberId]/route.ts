import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Props {
    params: {
        memberId: string
    }
}

export async function PATCH(req: Request, { params }: Props) {
    try {

        const profile = await currentUser();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const serverId = searchParams.get("serverId");

        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });

        if (!params.memberId) return new NextResponse("Member ID Missing", { status: 400 });

  

    } catch (error) {
        console.log("[MEMBERS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}