import "./Styles/SignIn.scss";
import React, { useEffect, useState } from "react";
import useLoginsOperations from "../Custom_Hooks/useLoginsOperations";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SignIn() {
  const { signIn } = useLoginsOperations();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSignIn() {
    if (email.trim() != "" && password.trim() != "") {
      setLoading(true);
      signIn(email, password)
        .then(() => {
          setLoading(true);
          navigate("/");
          /////
          toast.success("Sign In Successfully", {
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
        .finally(() => {
          setLoading(false);
        });
    } else alert("Fill All Fields.");
  }

  const user = useSelector((state) => state.current_user.user);

  useEffect(() => {
    // if (user != undefined) navigate("/");
    if (user?.uid) navigate("/");
  }, [user]);

  return (
    <div className="signin-page">
      <div class="box">
        <div class="container">
          <div class="top">
            <span>Have an account?</span>
            <header>Login</header>
          </div>
          <div class="input-field">
            <input
              type="email"
              class="input"
              placeholder="Email"
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i class="bx bx-lock-alt"></i>
          </div>
          <div class="input-field" onClick={handleSignIn}>
            <input
              type="submit"
              class="submit"
              value={loading ? "Loading..." : "Login"}
              id=""
            />
          </div>
          <div class="two-col">
            <div class="one">
              <input type="checkbox" name="" id="check" />
              <label for="check"> Remember Me</label>
            </div>
            <div class="two">
              <label>
                <a href="#">Forgot password?</a>
              </label>
            </div>
          </div>
          <div class="link-to-signup">
            <label>
              <Link to="/signup">Go to SingUp</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
