import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useLoginsOperations from "../Custom_Hooks/useLoginsOperations";
import { db } from "../Firebase/firebase-config";
import { nanoid } from "nanoid";
import { putCurrentChat } from "../ReduxTK/Slices/ChatsSlice";
import Messages from "./Messages";

export default function RightSide() {
  const { logout } = useLoginsOperations();
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chats_info.currentChat);
  //////////
  function handleSignOut() {
    setTimeout(() => {
      logout().then(() => {
        toast.warn("Sign Out Successfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
        //////
        dispatch(putCurrentChat(undefined));
      });
    }, 180);
  }
  /////////
  const [textMess, setTextMess] = useState("");

  const user = useSelector((state) => state.current_user.user);
  /////
  async function sendText() {
    const { uid, displayName, photoURL } = user;
    const { uid: uidOpp, displayName: displayNameOpp } = currentChat.userInfo;
    // before we need to get prev messages...
    const getPrevMess = await getDoc(
      doc(db, "users", uid, "chatsList", displayNameOpp)
    );
    const prevMess = getPrevMess.data().messages;
    const currentMess = {
      text: textMess,
      id_Rand: nanoid(20),
      date: new Date().toISOString(),
      userSent: {
        name: displayName,
        photoURL: photoURL,
        uid: uid,
      },
    };
    setTextMess("");
    const newMess = [...prevMess, currentMess];
    // // 1) add mess to currentUser
    await updateDoc(doc(db, "users", user.uid, "chatsList", displayNameOpp), {
      messages: newMess,
    });
    // // 2) add mess to oppositeUser
    await updateDoc(doc(db, "users", uidOpp, "chatsList", user.displayName), {
      messages: newMess,
    });
  }

  return (
    <div className="right-side">
      {/* opposite-person-info */}
      <div className="opposite-person-info">
        {currentChat != undefined && (
          <>
            <div className="info">
              <div className="cont-img">
                <img src={currentChat?.userInfo?.photoURL} alt="" />
              </div>
              <div className="name--status">
                <span>{currentChat?.userInfo?.displayName}</span>
                <span>Online</span>
              </div>
            </div>
            <div className="settings">
              <ul>
                <div className="sign-out" onClick={handleSignOut}>
                  <i class="bi bi-box-arrow-left"></i>
                  SignOut
                </div>
                <li>
                  <i class="bi bi-search"></i>
                </li>
                <li>
                  <i class="bi bi-three-dots-vertical"></i>
                </li>
              </ul>
            </div>
          </>
        )}
        {currentChat == undefined && (
          <div className="settings" style={{ marginLeft: "auto" }}>
            <ul>
              <div className="sign-out" onClick={handleSignOut}>
                <i class="bi bi-box-arrow-left"></i>
                SignOut
              </div>
            </ul>
          </div>
        )}
      </div>
      {/* messages */}
      <Messages />
      {/* send-input */}
      <div className="send-input">
        <i class="bi bi-emoji-smile"></i>
        <textarea
          placeholder="Message Here..."
          disabled={currentChat == undefined}
          value={textMess}
          onChange={(e) => setTextMess(e.target.value)}
        ></textarea>
        {textMess.trim() != "" ? (
          <i
            class="bi bi-send-fill"
            style={{ outline: "3.5px solid #666", transition: "0.2s" }}
            onClick={sendText}
          ></i>
        ) : (
          <i class="bi bi-mic-fill"></i>
        )}
      </div>
    </div>
  );
}
