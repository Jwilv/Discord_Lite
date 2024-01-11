import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'
import { Channel, Member, Profile, Server } from "@prisma/client"

export type ServerWithMembersWhithProfiles = Server & {
    members: Member[]
};

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server : NetServer & {
            io : SocketIOServer
        };
    };
};
