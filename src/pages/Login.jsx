import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../assets/Wechat-logo-removebg.png";
import "../styles/Login.css";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { username, email, password, confirmPassword } = values;
      console.log("work ?");
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        return toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }

      navigate("/");
    }
  };

  const handleValidation = (event) => {
    const { username, password } = values;

    if (username.length == "") {
      toast.error("Email and password are requied");
      return false;
    } else if (password === "") {
      toast.error("Email and password are requied");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    console.log(values);
    setvalues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="loginContainer">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Website logo" />
            <div className="singleInput">
              <input
                className="form-control"
                type={"text"}
                name="username"
                placeholder="username"
                min={3}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="singleInput">
              <input
                className="form-control"
                type={"password"}
                name="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />{" "}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Login
            </button>
            <span>
              Don't have an account ? <Link to="/Signup">Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
