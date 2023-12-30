import { currentUser } from "@/lib/current-user";
import { getServersByUserId } from "@/services/server";
import { redirect } from 'next/navigation'
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";


export const NavigationSidebar = async () => {

    const profile = await currentUser();

    if (!profile) return redirect('/');

    const servers = await getServersByUserId(profile.id);

    return (
        <div
            className="space-y-4 flex flex-col items-center h-full text-primary
                w-full dark:bg-[#1E1F22] py-3"
        >
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {
                    servers.map((server) => (
                        <div key={server.id} className="mb-4">
                            <NavigationItem {...server}/> 
                        </div>
                    ))
                }
            </ScrollArea>
        </div>
    )
}