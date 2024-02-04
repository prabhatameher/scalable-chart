import http from 'http'
import { Server, } from 'socket.io';
import express from 'express'

const app = express()

async function init() {

    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
        cors: {
            allowedHeaders: ["*"],
            origin: '*'
        }
    })

    io.on("connection", (socket) => {
        console.log(`New Socket Connected :${socket.id}`)
        socket.on("event:message", ({ message }: { message: string }) => {
            console.log(`Got the msg ::: ${message}`)
            io.emit("event:message", { message })
            // socket.broadcast.emit("event:message", { message })
        })

        // Disconnect event
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    })

    const PORT = process.env.PORT ? process.env.PORT : 5000
    httpServer.listen(PORT, () => {
        console.log(`Server listening on PORT: ${PORT}`)
    })

}

init()