import { getProfileByUserId } from "@/services";
import { auth } from "@clerk/nextjs"
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export const currentUser = async() => {
    const { userId } = auth();
    
    if (!userId) return null;

    const user = await getProfileByUserId(userId);

    return user
}

export const currentProfile = async(req : NextApiRequest) => {
    const { userId } = getAuth(req);
    
    if (!userId) return null;

    const user = await getProfileByUserId(userId);

    return user
}