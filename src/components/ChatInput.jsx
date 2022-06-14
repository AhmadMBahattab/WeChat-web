import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "../styles/ChatInput.css";

function ChatInput() {
  const [showEmoijiPicker, setshowEmoijiPicker] = useState(false);
  const [msg, setmsg] = useState("");

  const handleShowEmojiPicker = () => {
    setshowEmoijiPicker(!showEmoijiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setmsg(message);
  };
  return (
    <div className="chatInputContainer">
      <div className="inputButtonContainer">
        <div className="emoji">
          <BsEmojiSmileFill
            size={25}
            color="yellow"
            onClick={handleShowEmojiPicker}
          />
          {showEmoijiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form action="" className="inputContainer">
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => {
            setmsg(e.target.value);
          }}
        />
        <button className="inputSubmit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
