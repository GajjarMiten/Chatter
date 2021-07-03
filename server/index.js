const express = require("express");
const cors = require("cors");

const { Server } = require("socket.io");
const http = require("http");

const app = express();

const UserController = require("./users/users");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*:*",
    },
});

const PORT = process.env.PORT || 8080;
const HOST_NAME = process.env.HOST_NAME || "localhost";

const router = require("./routes/router");

app.use("/", (req, res) => {
    res.send("hello");
});
app.use(cors());

io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = UserController.addUser({
            id: socket.id,
            name,
            room,
        });

        if (error) {
            return callback(error);
        }
        socket.join(user.room);
        socket.emit("message", {
            user: "admin",
            text: `${user.name}, Welcome to the room ${user.room}`,
        });

        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name}, has joined`,
        });

        // callback();
    });

    socket.on("sendMessage", ({ name, room, message }, callback) => {
        try {
            const user = UserController.getUser({ name, room });

            io.to(user.room).emit("message", {
                user: user.name,
                text: message,
            });
        } catch (error) {
            console.log(error);
            callback();
        }
    });

    socket.on("usergone", ({ name, room }) => {
        const user = UserController.removeUser({ name, room });

        if (user) {
            io.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} had left`,
            });
        }
    });

    // socket.on("disconnect", ({ name, room }) => {});
});
app.use(function (req, res, next) {
    res.send("404 not found");
});
server.listen(PORT, () => {
    console.log("server is running on PORT: " + PORT);
});
