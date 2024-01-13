import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
}

type MessageWithMember = Message & {
    member: Member;
}

export const useChatSocket = ({ addKey, updateKey, queryKey }: ChatSocketProps) => {

    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        socket.on(updateKey, (message: MessageWithMember) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData;
                }

                const newData = oldData.pages.map((page: any) => {
                    return {
                        ...page,
                        items: page.items.map((item: MessageWithMember) => {

                            if (item.id === message.id) return message;

                            return item;
                        })
                    }
                })

                return {
                    ...oldData,
                    pages: newData
                }

            });

        })

        socket.on(addKey, (message: MessageWithMember) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{
                            items: [message]
                        }]
                    };
                }

                const newData = [...oldData.pages];

                newData[0].items = {
                    ...newData[0],
                    items: {
                        message,
                        ...oldData[0].items
                    }
                };

                return {
                    ...oldData,
                    pages: newData,
                }


            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        }

    }, [queryClient, socket, addKey, updateKey, queryKey]);
}