import React, { useState, useEffect } from "react";
import Logo from "../assets/Wechat-logo-removebg.png";
import "../styles/Contacts.css";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentUserImage, setcurrentUserImage] = useState(undefined);
  const [currentSelected, setcurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setcurrentUserName(currentUser.username);
      setcurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentUser = (index, contact) => {
    setcurrentSelected(index);
    changeChat(contact);
  };

  console.log("From componrnts :", currentUser);
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contactsContainer">
          <div className="brandContacts">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => (
              <>
                <div
                  className={`contact ${
                    index === currentSelected ? "selectedChat" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentUser(index, contact)}
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
              </>
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
              <h2> <b>{currentUserName}</b></h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
