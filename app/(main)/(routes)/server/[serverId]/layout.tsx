import { currentUser } from "@/lib/current-user";
import { redirectToSignIn } from "@clerk/nextjs/server";

interface Props {
    children: React.ReactNode;
    params: { serverId: string }
}


const ServerIdLayout = async ({ children, params }: Props) => {

    const profile = await currentUser();

    if (!profile) return redirectToSignIn();

    return (
        <div>
            {children}
        </div>
    )
}

export default ServerIdLayout