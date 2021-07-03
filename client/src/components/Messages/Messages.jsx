import React from "react";
import "./Messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";


const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className="messages">
            {messages.map((msg, id) => {
                return <Message message={msg} key={id} name={name} />;
            })}
        </ScrollToBottom>
    );
};

export default Messages;
