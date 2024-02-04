"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';

interface SocketProviderProp {
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: string) => any,
    messages: string[]
}

const SocketContext = React.createContext<ISocketContext | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext)
    if (!state) throw new Error("State is undefined")
    return state;
}

export const SocketProvider: React.FC<SocketProviderProp> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<string[]>([''])

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        console.log("Send Message", msg)
        if (socket) {
            socket.emit("send:message", { message: msg })
        }
    }, [socket])

    const onMessageReceive = useCallback(({ message }: { message: string }) => {
        console.log(`Received MSG : ${message}`)
        setMessages(prev => [...prev, message])
    }, [])

    useEffect(() => {
        const _socket = io("http://localhost:5000");
        _socket.on("receive:message", onMessageReceive)
        setSocket(_socket)

        socket?.on("receive:message", ({ message }) => {
            console.log(`Received MSG :::${message}`)
        })

        return () => {
            _socket.off("event:message", onMessageReceive)
            _socket.disconnect()
            setSocket(undefined)
        };

    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage, messages }}>{children}</SocketContext.Provider>
    )
}
