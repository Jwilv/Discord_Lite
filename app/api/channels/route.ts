import { createChannel } from "@/services";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const profile = await currentUser();
        const { type, name } = await req.json();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });
        if (name === 'general') return new NextResponse("Name cannot br 'general'", { status: 400 });

        const server = await createChannel({ name, type, profileId: profile.id, serverId });

        return NextResponse.json(server);

    } catch (error) {
        console.log("CHANNELS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}