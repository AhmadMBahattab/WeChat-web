import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { allUsersRoute } from "../utils/APIRoutes";
import "../styles/Chat.css";

function Chat() {
  const navigate = useNavigate();
  const [contcts, setcontcts] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/Login");
      } else {
        setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
      getCurrentUser();
    };
  }, []);
  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarSet) {
          const { data: contacts } = await axios.get(`${allUsersRoute}`);
          setcontcts(contacts);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getContacts();
  }, [currentUser]);

  return (
    <div className="chatContainer">
      <div className="container">fjfhhffhhf</div>
    </div>
  );
}

export default Chat;
