import { currentUser, redirectToSignIn } from '@clerk/nextjs'

import { createNewProfile, getProfileById } from '@/services';

export const initialProfile = async () => {
    const user = await currentUser()

    if (!user) return redirectToSignIn()

    const profile = await getProfileById(user.id)

    if (profile) return profile;

    const newProfile = createNewProfile(user);

    return newProfile
};