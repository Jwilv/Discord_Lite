import { currentUser } from "@/lib/current-user";
import { getServersByUserId } from "@/services/server";
import { redirect } from 'next/navigation'
import { NavigationAction } from "./navigation-action";


export const NavigationSidebar = async () => {

    const profile = currentUser();

    if (!profile) return redirect('/');

    const servers = await getServersByUserId(profile.userId!);

    return (
        <div
            className="space-y-4 flex flex-col items-center h-full text-primary
                w-full dark:bg-[#1E1F22] py-3"
        >
            <NavigationAction />
        </div>
    )
}