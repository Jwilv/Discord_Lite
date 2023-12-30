import { getProfileByUserId } from "@/services";
import { auth } from "@clerk/nextjs"

export const currentUser = async() => {
    const { userId } = auth();
    
    if (!userId) return null;

    const user = await getProfileByUserId(userId);

    return user
}