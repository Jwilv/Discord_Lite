import { currentUser, redirectToSignIn } from "@clerk/nextjs";


export const ServerSidebar = async () => {

    const profile = await currentUser();
    if (!profile) return redirectToSignIn();

    

    return (
        <div>
            Server Sidebar Component
        </div>
    )
}