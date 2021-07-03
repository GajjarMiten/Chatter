import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import Input from "../../components/Input/Input";
import Messages from "../../components/Messages/Messages";

let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);

    const ENDPOINT = "https://chatter-backend-node.herokuapp.com";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT, { reconnectionAttempts: 3 });
        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (e) => {
            console.log(e);
        });

        return () => {
            socket.emit("usergone", { name, room });
            socket.disconnect();
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    const sendMessgae = (e) => {
        e.preventDefault();
        if (e.target.msg.value) {
            socket.emit(
                "sendMessage",
                {
                    name: name,
                    room: room.toString(),
                    message: e.target.msg.value,
                },
                () => {}
            );
            e.target.msg.value = "";
        }
    };

    return (
        <div className="outerContainer">
            {messages.length}
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input cb={sendMessgae} />
            </div>
        </div>
    );
};

export default Chat;
