import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import "../styles/Chat.css";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();

  const [contacts, setcontacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);
  const [currentChat, setcurrentChat] = useState(undefined);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        console.log("From chat: ", "No user ");
        navigate("/Login");
      } else {
        setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    getCurrentUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, []);

  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarSet) {
          const { data: contacts } = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );

          setcontacts(contacts);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setcurrentChat(chat);
  };
  console.log(io(host).connected);
  console.log(socket);
  return (
    <>
      <div className="chatContainer">
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <>
              {/* {socket.current !== undefined && ( */}
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
              {/* )} */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
