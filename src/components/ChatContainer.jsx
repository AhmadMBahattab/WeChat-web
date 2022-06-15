import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/ChatContainer.css";
import { addMessagesRoute, getAllMessagesRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";

function ChatContainer({ currentChat, currentUser }) {
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setmessages(data);
      console.log(data);
    };
    getMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(addMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };
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
      <div className="chatMessages">
        {messages.map((msg) => (
          <div>
            <div className={`message ${msg.fromSelf ? "sended" : "recieved"}`}>
              <div className="contents">
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <ChatMessages /> */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ChatContainer;
