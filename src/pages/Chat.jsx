import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import "../styles/Chat.css";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setcontacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        console.log("From chat: ", "No user ");
        navigate("/Login");
      } else {
        console.log("From chat: ", "User ");
        setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarSet) {
          const { data: contacts } = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          console.log(contacts);
          setcontacts(contacts);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getContacts();
  }, [currentUser]);

  return (
    <div className="chatContainer">
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Chat;
