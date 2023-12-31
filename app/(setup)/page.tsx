import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initial-profile"
import { getFirstServerByProfileId } from "@/services/serverServices";
import { InitialModal } from "@/components/modals/initial-modal";


const SetupPage = async () => {

    const profile = await initialProfile();
    const server = await getFirstServerByProfileId(profile.id);

    if (server) return redirect(`/server/${server.id}`)

    return <InitialModal /> 
}

export default SetupPage