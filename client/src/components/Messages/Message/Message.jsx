import React from "react";
import ReactEmoji from "react-emoji";

import "./Message.css";
const Message = ({ message, name }) => {
    let currentUser = name.trim().toLowerCase() === message.user;

    return currentUser ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{name}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">
                    {ReactEmoji.emojify(message.text)[0]}
                </p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">
                    {ReactEmoji.emojify(message.text)[0]}
                </p>
            </div>
            <p className="sentText pl-10">{message.user}</p>
        </div>
    );
};

export default Message;
