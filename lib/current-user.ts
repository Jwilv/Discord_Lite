import { auth } from "@clerk/nextjs"

export const currentUser = () => {
    const profile = auth();
    return profile;
}