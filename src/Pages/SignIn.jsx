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
      <div className="box">
        <div className="container">
          <div className="top">
            <span>Have an account?</span>
            <header>Login</header>
          </div>
          <div className="input-field">
            <input
              type="email"
              className="input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <i className="bi bi-envelope-at"></i>
          </div>
          <div className="input-field">
            <input
              type="Password"
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i className="bi bi-lock"></i>
          </div>
          <div className="input-field" onClick={handleSignIn}>
            <input
              type="submit"
              className="submit"
              value={loading ? "Loading..." : "Login"}
              // id=""
            />
          </div>
          <div className="two-col">
            <div className="one">
              <input type="checkbox" name="" id="check" />
              <label htmlFor="check"> Remember Me</label>
            </div>
            <div className="two">
              <label>
                <a href="#">Forgot password?</a>
              </label>
            </div>
          </div>
          <div className="link-to-signup">
            <label>
              <Link to="/signup">Go to SingUp</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
