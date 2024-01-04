import { db } from '@/lib/db'
import { User } from '@clerk/nextjs/server';

export const getProfileByUserId = async (id: string) => {
    return await db.profile.findUnique({
        where: {
            userId: id
        }
    });
};

export const createNewProfile = async (user: User) => {

    const name = user.emailAddresses[0].emailAddress.split('@')[0];

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: user.firstName ? `${user.firstName} ${user.lastName}` : `${name}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newProfile
};