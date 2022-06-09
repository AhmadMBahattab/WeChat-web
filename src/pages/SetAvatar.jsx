import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAvatarRoute } from "../utils/APIRoutes";
import "../styles/SetAvatar.css";
import { Buffer } from "buffer";
const apiAvatars = "https://api.multiavatar.com/4567894";

function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setavatars] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    const data = [];
    for (let index = 0; index < 4; index++) {
      const image = await axios.get(
        `${apiAvatars}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
      console.log(data);
    }
    setavatars(data);
    setisLoading(false);
    console.log("Avatar page");
  }

  const setProfilesPicture = async () => {};

  return (
    <div className="avatarsContainer">
      <div className="titleContainer">
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="Avatar"
                onClick={() => {
                  setselectedAvatar(index);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SetAvatar;
