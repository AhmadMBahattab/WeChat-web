import React from "react";
import "../styles/ChatContainer.css";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";

function ChatContainer({ currentChat }) {
  const handleSendMsg = async (msg) => {};
  return (
    <div className="singleChatContainer">
      <div className="chatHeader">
        <div className="userDetails">
          <div className="avatarSingleChat">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
              className="SingleImage"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <ChatMessages />
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ChatContainer;
