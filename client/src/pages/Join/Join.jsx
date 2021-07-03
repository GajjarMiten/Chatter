import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">JOIN</h1>
                <div>
                    <input
                        type="text"
                        className="joinInput"
                        placeholder="your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="joinInput mt-20"
                        placeholder="room id"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        required
                    />
                </div>
                <Link
                    to={`/chat?name=${name}&room=${room}`}
                    onClick={(e) =>
                        !room || !name ? e.preventDefault() : null
                    }
                >
                    <button className="button mt-20" type="submit">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
