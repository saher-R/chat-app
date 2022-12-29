import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../Firebase/firebase-config";
///For TimeAgo...
import ReactTimeAgo from "react-time-ago";
//////

export default function Messages() {
  const currentChat = useSelector((state) => state.chats_info.currentChat);
  const user = useSelector((state) => state.current_user.user);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user != null && currentChat != undefined) {
      onSnapshot(
        query(collection(db, "users", user.uid, "chatsList")),
        (data) => {
          const _mess = data.docs.map((m) => m.data());
          _mess.forEach((x) => {
            if (x.userInfo.uid == currentChat.userInfo.uid)
              setMessages(x.messages);
          });
          // setLoading(false);
        }
      );
    }
  }, [user, currentChat]);

  //this for goDown page when send mess...
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages.length > 0 &&
        messages.map((data) => {
          return (
            <div
              className={
                data.userSent.uid == user.uid ? "right-message" : "left-message"
              }
              key={data.id_Rand}
              ref={ref}
            >
              <div className="mess-info">
                <div className="user-info">
                  <div className="cont-img">
                    <img src={data.userSent.photoURL} alt="" />
                  </div>
                  <div className="date-sent">
                    <ReactTimeAgo date={data.date} locale="en-US" />
                  </div>
                </div>
                <div className="text-mess">{data.text}</div>
              </div>
              <div className="settings">
                <i class="bi bi-three-dots"></i>
              </div>
            </div>
          );
        })}
    </div>
  );
}