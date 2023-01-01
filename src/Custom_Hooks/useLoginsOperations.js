import { useEffect } from "react";
import { auth, db, storage } from "../Firebase/firebase-config";
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
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function useLoginsOperations() {
  ////

  const navigate = useNavigate();

  const createUser = async (email, password, userName, imgFile) => {
    if (imgFile != undefined) {
      // ((With Photo..))
      ///////////////////////
      const storageRef = ref(storage, "profiles-images/" + nanoid(20));
      const uploadTask = uploadBytesResumable(storageRef, imgFile);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        },
        (error) => {
          alert(error.message);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //now after add img to storage, create the account.
            createUserWithEmailAndPassword(auth, email, password).then(
              ({ user }) => {
                updateProfile(auth.currentUser, {
                  displayName: userName,
                  photoURL: downloadURL,
                }).then(async () => {
                  const { uid, email, displayName, photoURL } = user;
                  await setDoc(doc(db, "users", uid), {
                    uid,
                    email,
                    displayName,
                    photoURL,
                  });
                  dispatch(setUser({ uid, displayName, email, photoURL }));
                });
              }
            );
          });
        }
      );
      //************************************
      //////////////////////////////////////
    } else {
      // ((Without Photo..))
      //////////////////////////////////////
      createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: userName,
        }).then(async () => {
          const { uid, email, displayName, photoURL } = user;
          await setDoc(doc(db, "users", uid), {
            uid,
            email,
            displayName,
            photoURL,
          });
          ///
          dispatch(setUser({ uid, displayName, email, photoURL }));
        });
      });
      //////////////////////////////////////
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const dispatch = useDispatch();

  const logout = async () => {
    await signOut(auth);
    return dispatch(setUser(undefined));
  };

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

  /**************************************** */
  return { createUser, signIn, logout };
}
