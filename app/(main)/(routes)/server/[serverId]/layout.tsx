import { currentUser } from "@/lib/current-user";
import { getServerById } from "@/services/server";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
    params: { serverId: string }
}


const ServerIdLayout = async ({ children, params }: Props) => {

    const profile = await currentUser();

    if (!profile) return redirectToSignIn();

    const server = await getServerById(params.serverId);

    if (!server) return redirect('/');

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}

export default ServerIdLayout