import React from "react";
import Image from "../assets/black.jpg";

interface WelcomeProps {
    str: string;
}

const Welcome = () => (
    <div className="welcome">
        <h1>Welcome111</h1>

        <img src={Image} alt="" />
    </div>
);

export default Welcome;
