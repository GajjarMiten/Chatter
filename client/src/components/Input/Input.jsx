import React from "react";
import "./Input.css";

const Input = ({ cb }) => {
    return (
        <form className="form" onSubmit={cb}>
            <input
                className="input"
                type="text"
                placeholder="type a message"
                name="msg"
                required
            />
            <button className="sendButton" type="submit">Send</button>
        </form>
    );
};

export default Input;
