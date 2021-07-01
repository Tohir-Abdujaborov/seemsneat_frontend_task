import axios from "axios";
import { useState, useEffect } from "react";
import Danger from "../components/alerts/Danger";
import Success from "../components/alerts/Success";
import { validateIfEmpty, validateEmailFormat } from "../validations/";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setFailedMessage] = useState("");
  const [loginSuccess, setSuccessMessage] = useState("");
  const loggedInMessage = "You are logged in";

  useEffect(() => {
    if (window.localStorage.getItem("userData"))
      setSuccessMessage(loggedInMessage);
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    if (validateIfEmpty(userName, password)) {
      setFailedMessage("");
      if (validateEmailFormat(userName)) {
        setFailedMessage("");
        signInUserTocken();
      } else {
        setFailedMessage(
          "Wrong email format. Please provide correct email address"
        );
      }
    } else {
      setFailedMessage("Empty fields. Please fill up all fields");
    }
  }

  function signInUserTocken() {
    axios
      .get("https://tohir.lt/api/users/", {
        // Fake API Call
        params: {
          userName: userName,
          password: password,
        },
      })
      .then((Response) => {
        if (Response.data === "LoggedIn") {
          setSuccessMessage(loggedInMessage);
          setFailedMessage("");
          saveCredentials();
        } else if (Response.data === "LoginFailed") {
          setFailedMessage("Login failed");
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function saveCredentials() {
    const userData = {
      email: userName,
      password: password,
    };
    window.localStorage.setItem("userData", JSON.stringify(userData));
  }

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center vertical-center">
        <div className="col-md-5">
          <div className="form_container">
            <div className="header">
              <span>Login Form</span>
            </div>
            <div className="f_body">
              <form onSubmit={submitHandler}>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={loginSuccess !== "" ? true : false}
                  />
                  <i className="fa fa-user-o mt-auto mb-auto ms-2"></i>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loginSuccess !== "" ? true : false}
                  />
                  <i className="fa fa-lock mt-auto mb-auto ms-2"></i>
                </div>
                <button
                  type="submit"
                  disabled={loginSuccess !== "" ? true : false}
                >
                  Sign In
                </button>
              </form>
              {loginFailed !== "" ? <Danger message={loginFailed} /> : ""}
              {loginSuccess !== "" ? <Success message={loginSuccess} /> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
