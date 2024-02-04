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
        socket.on("send:message", async ({ message }: { message: string }) => {
            console.log(`Got the msg ::: ${message}`)
            io.emit("receive:message", { message })
            // socket.broadcast.emit("message", { message })

            //Publish this message to Redis
            // await pub.publish("MESSAGE", JSON.stringify({ message }))
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