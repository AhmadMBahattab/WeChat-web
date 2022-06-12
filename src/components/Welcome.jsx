import React from "react";
import "../styles/Welcome.css";

function Welcome({ currentUser }) {
  return (
    <div className="welcomeContainer">
      <h1>
        Welcome, <b>{currentUser && currentUser.username}</b>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </div>
  );
}

export default Welcome;
