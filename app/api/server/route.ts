import { getProfileByUserId } from "@/services";
import { createServer } from "@/services/serverServices";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const { name, imageUrl }: { name: string, imageUrl: string } = await req.json();
        const { userId } = auth();
        const profile = await getProfileByUserId(userId!)

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await createServer({ name, imageUrl, profile });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[SERVERS_POST]", error)
        return new NextResponse('Internal Error', { status: 500 });
    }
}