import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigateTo = useNavigate();

  const SignUp = () => {
    setSignUpActive(true);
  };

  const SignIn = (e) => {
    setSignUpActive(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    const postData = {
      username: username,
      email: email,
      password: password,
    };
    localStorage.setItem("userData", postData);
    localStorage.setItem("isLogin", true);
    navigateTo("/home");
    
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    if (username !== "" && password !== "") {
      const postData = {
        username: username,
        password: password,
      };

      axios
        .post("https://fakestoreapi.com/auth/login", postData)
        .then((response) => {
          console.log("Response = ", response.data);
          localStorage.setItem("isLogin", true);
          navigateTo("/home");
        })
        .catch((error) => {
          console.log("Error = ", error);
          toast("Username dan Password Salah");
        });
    } else {
      toast("Harap Lengkapi data Terlebih dahulu");
    }
  };

  return (
    <>
      <div className="signinup-container" style={{ display: "block" }}>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />

        <div
          className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow:
              "0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            width: "768px",
            maxWidth: "100%",
            minHeight: "480px",
          }}
          id="container "
        >
          <div className="form-container sign-up-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button>{"Sign Up"}</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form onSubmit={handleSignIn}>
              <h1>Sign in</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button onClick={SignIn}>{"Sign In"}</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" onClick={SignIn}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button className="ghost" onClick={SignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default Login;
