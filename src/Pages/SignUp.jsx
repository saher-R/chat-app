import "./Styles/SignUp.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLoginsOperations from "../Custom_Hooks/useLoginsOperations";
import { toast } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

export default function SignUp() {
  const { createUser } = useLoginsOperations();
  const user = useSelector((state) => state.current_user.user);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgFile, setImgFile] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignUp() {
    if (email.trim() != "" && password.trim() != "" && userName.trim() != "") {
      //first: check if this displayName already used.
      setLoading(true);
      const _users = await getDocs(collection(db, "users"));
      let check = true;
      _users.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data().displayName == userName) {
          alert("This User Name already used, Try another one please.");
          check = false;
          setLoading(false);
          return;
        } else if (doc.data().email == email) {
          alert("This Email already used, Try another one please.");
          check = false;
          setLoading(false);
          return;
        }
      });
      if (check) {
        //
        setLoading(true);
        createUser(email, password, userName, imgFile)
          .then(() => {
            setLoading(true);
            toast.success("Sign Up Successfully", {
              position: "top-center",
              autoClose: 2800,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "dark",
            });
          })
          .catch((err) => {
            setLoading(false);
            alert(err.message);
          });
      }
    } else alert("Fill All Fields.");
  }

  useEffect(() => {
    if (user?.uid) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="signup-page">
      <div className="box">
        <div className="container">
          <div className="top">
            <span>Create an account.</span>
            <header>SignUp</header>
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="Username"
              // id=""
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="input-field">
            <input
              type="email"
              className="input"
              placeholder="Email"
              // id=""
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
              // id=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i className="bi bi-lock"></i>
          </div>

          <div className="input-field">
            <input
              type="file"
              className="input"
              // id=""
              onChange={(e) => setImgFile(e.target.files[0])}
              style={{ paddingTop: "10px" }}
            />
            <i className="bi bi-image-fill"></i>
          </div>

          <div className="two-col">
            <div className="one ms-2">
              <input type="checkbox" name="" id="check" />
              <label htmlFor="check"> Remember Me</label>
            </div>
          </div>
          <div className="input-field" onClick={handleSignUp}>
            <input
              type="submit"
              className="submit"
              value={loading ? "Loading..." : "SignUp"}
              // id=""
            />
          </div>
          <div className="link-to-signin">
            <label>
              <Link to="/signin">Go to SignIn</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
