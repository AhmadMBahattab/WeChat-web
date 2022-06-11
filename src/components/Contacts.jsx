import React, { useState, useEffect } from "react";
import Logo from "../assets/Wechat-logo-removebg.png";
import "../styles/Contacts.css";

function Contacts({ contacts, currentUser }) {
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentUserImage, setcurrentUserImage] = useState(undefined);
  const [currentSelected, setcurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setcurrentUserName(currentUser.username);
      setcurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentUser = (index, contact) => {};

  console.log("From componrnts :", currentUser);
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contactsContainer">
          <div className="brandContacts">
            <img src={Logo} alt="Logo" />
            <h3>WeChat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="currentUser">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h1>{currentUserName}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
