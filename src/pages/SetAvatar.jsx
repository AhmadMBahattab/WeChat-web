import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAvatarRoute } from "../utils/APIRoutes";
import "../styles/SetAvatar.css";
import { Buffer } from "buffer";
const apiAvatars = "https://api.multiavatar.com/4567894";

const loader = require("../assets/Loder2.gif");

function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setavatars] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);

  useEffect(() => {
    getImages();

    if (!localStorage.getItem("chat-app-user")) {
      navigate("/Login");
    }
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

  const setProfilesPicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(data);

      if (data.isSet) {
        user.isAvatarSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
        return;
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="avatarsContainer">
          <img src={loader} alt="Loader" className="loader" />
        </div>
      ) : (
        <div className="avatarsContainer">
          <div className="titleContainer">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
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
          <div>
            <button className="btn btn-primary" onClick={setProfilesPicture}>
              Set as profile picture
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SetAvatar;
