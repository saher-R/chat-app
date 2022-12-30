import { useEffect } from "react";
import { auth, db } from "../Firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../ReduxTK/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
///////////////
import { doc, setDoc } from "firebase/firestore";

export default function useLoginsOperations() {
  ////

  const navigate = useNavigate();

  const createUser = async (email, password, userName) => {
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(auth.currentUser, {
        displayName: userName,
      }).then(() => {
        const { uid, email, displayName, photoURL } = user;
        setDoc(doc(db, "users", uid), {
          uid,
          email,
          displayName,
          photoURL,
        });
      });
    });
    // }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const dispatch = useDispatch();

  const logout = async () => {
    await signOut(auth);
    return dispatch(setUser(undefined));
  };

  const user = useSelector((state) => state.current_user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      if (currentUser != null) {
        const { uid, displayName, email, photoURL } = currentUser;
        dispatch(setUser({ uid, displayName, email, photoURL }));
      } else {
        if (window.location.pathname == "/signup") navigate("/signup");
        else navigate("/signin");
      }
    });
    ////
    return () => {
      unsubscribe();
    };
  }, []);
  // }, [user]);

  /**************************************** */
  return { createUser, signIn, logout };
}
