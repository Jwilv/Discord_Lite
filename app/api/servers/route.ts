import { db } from "@/lib/db";
import { getProfileById } from "@/services";
import { auth } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
    try {

        const { name, imageUrl } = await req.json();
        const { userId } = auth();
        const profile = await getProfileById(userId!)

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: {
                        name: "general",
                        profileId: profile.id
                    }
                },
                members: {
                    create: {
                        profileId: profile.id,
                        role: MemberRole.ADMIN
                    }
                }
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[SERVERS_POST]", error)
        return new NextResponse('Internal Error', { status: 500 });
    }
}