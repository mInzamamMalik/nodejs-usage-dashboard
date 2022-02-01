import os from 'os'
import osu from 'node-os-utils'
import express from 'express';
import { createServer } from "http";
import { Server as socketIo } from 'socket.io';
import cors from "cors";

let app = express()
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 4000

app.use('/', express.static(path.join(__dirname, 'web/build')))
app.get("/", (req, res, next) => {
    res.send("ping");
})
app.post("/putload", (req, res, next) => {

    let data = [];

    for (let i = 0; i < 99999; i++) {
        data.push(Math.random());
        console.log("load " + i)
    }

    res.send("completed");
})

// THIS IS THE ACTUAL SERVER WHICH IS RUNNING
const server = createServer(app);

// handing over server access to socket.io
const io = new socketIo(server, { cors: { origin: "*", methods: "*", } });


io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);

    // to emit data to a certain client
    socket.emit("topic 1", "some data")

    socket.on("disconnect", (message) => {
        console.log("Client disconnected with id: ", message);
    });
});


// to emit data to a certain client
//  connectedUsers[0].emit("topic 1", "some data")



let cpu = osu.cpu
let drive = osu.drive
let mem = osu.mem

setInterval(() => {

    Promise.all([
        cpu.usage(),
        cpu.free(),
        mem.info(),
        drive.info()
    ]).then(informations => {
        // console.log(informations);

        io.emit("USAGE", { data: informations });
        console.log("emiting data to all client");
    });

}, 500)

app.get("/**", (req, res, next) => {
    // res.sendFile(path.join(__dirname, "./web/build/index.html"))
    res.redirect("/")
})
server.listen(PORT, function () {
    console.log("server is running on", PORT);
})










