import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatContainer.css";
import { addMessagesRoute, getAllMessagesRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const scrollRef = useRef();

  const [messages, setmessages] = useState([]);
  const [arrivalMessges, setarrivalMessges] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        const { data } = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setmessages(data);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setarrivalMessges({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessges && setmessages((prev) => [...prev, arrivalMessges]);
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const handleSendMsg = async (msg) => {
    // console.log(socket);
    await axios.post(addMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setmessages(msgs);
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
          <div ref={scrollRef} key={uuidv4()}>
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
