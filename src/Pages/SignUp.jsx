import "./Styles/SignUp.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLoginsOperations from "../Custom_Hooks/useLoginsOperations";
import { toast } from "react-toastify";

export default function SignUp() {
  const { createUser } = useLoginsOperations();
  const user = useSelector((state) => state.current_user.user);
  

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSignUp() {
    if (email.trim() != "" && password.trim() != "" && userName.trim() != "") {
      setLoading(true);
      createUser(email, password, userName)
        .then(() => {
          setLoading(true);
          navigate("/");
          /////
          toast.success("Sign Up Successfully", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => setLoading(false));
    } else alert("Fill All Fields.");
  }

  useEffect(() => {
    if (user?.uid) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="signup-page">
      <div class="box">
        <div class="container">
          <div class="top">
            <span>Create an account.</span>
            <header>SignUp</header>
          </div>
          <div class="input-field">
            <input
              type="text"
              class="input"
              placeholder="Username"
              // id=""
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <i class="bx bx-user"></i>
          </div>
          <div class="input-field">
            <input
              type="email"
              class="input"
              placeholder="Email"
              // id=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <i class="bx bx-user"></i>
          </div>
          <div class="input-field">
            <input
              type="Password"
              class="input"
              placeholder="Password"
              // id=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i class="bx bx-lock-alt"></i>
          </div>
          <div class="two-col">
            <div class="one ms-2">
              <input type="checkbox" name="" id="check" />
              <label for="check"> Remember Me</label>
            </div>
          </div>
          <div class="input-field" onClick={handleSignUp}>
            <input
              type="submit"
              class="submit"
              value={loading ? "Loading..." : "SignUp"}
              // id=""
            />
          </div>
          <div class="link-to-signin">
            <label>
              <Link to="/signin">Go to SingIn</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
