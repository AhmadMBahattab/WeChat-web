import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../assets/Wechat-logo-removebg.png";
import "../styles/Signup.css";
import { signupRoute } from "../utils/APIRoutes";
function Signup() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { username, email, password, confirmPassword } = values;
      console.log("work ?");
      const { data } = await axios.post(signupRoute, {
        username,
        email,
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
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Password not match", { position: "top-right" });
      return false;
    } else if (username.length < 3 || username.length > 15) {
      toast.error("Username length must be between 3 and 15 charecters");
      return false;
    } else if (email === "") {
      toast.error("Email can't be empty");
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
      <div className="signupContainer">
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
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="singleInput">
              <input
                type={"email"}
                className="form-control"
                name="email"
                placeholder="Email"
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

            <div className="singleInput">
              <input
                className="form-control"
                type={"password"}
                name="confirmPassword"
                placeholder="Comfirm password"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Create User
            </button>
            <span>
              already have an account ? <Link to="/Login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

// const FormContainer = styled.div`
//   hight: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 1rem;
//   background-color: white;
//   .brand {
//     desplay: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 4rem;
//     img {
//       hight: 10rem;
//       width: 500px;
//       height: 200px;
//     }
//     h1 {
//       color: red;
//     }
//   }
//   form {
//     disply: flex;
//     flex-direction: column;
//   }
// `;

export default Signup;
