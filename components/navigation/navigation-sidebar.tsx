import { currentUser } from "@/lib/current-user";
import { redirect } from 'next/navigation'


export const NavigationSidebar = async () => {

    const profile = currentUser();

    if (!profile) return redirect('/');

    
    return (
        <div>NavigationSidebar</div>
    )
}