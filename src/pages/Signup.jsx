import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Wechat-logo-removebg.png";
import "../styles/Signup.css";
function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form");
  };

  const handleChange = (event) => {
    console.log("change handeld");
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
                name="Username"
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

            <button type="submit" className="btn btn-primary">
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
