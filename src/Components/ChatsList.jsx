import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { putCurrentChat } from "../ReduxTK/Slices/ChatsSlice";

export default function ChatsList() {
  const user = useSelector((state) => state.current_user.user);
  const [listFriends, setListFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    if (user != null) {
      onSnapshot(
        query(collection(db, "users", user.uid, "chatsList")),
        (data) => {
          const _friends = data.docs.map((friend) => friend.data());
          setListFriends(_friends);
          setLoading(false);
        }
      );
    }
  }, [user]);
  //***********************************
  // Now click to choose the Chat...
  const dispatch = useDispatch();
  function handleOpenChat(_f) {
    dispatch(putCurrentChat(_f));
  }

  return (
    <div className="chats-list">
      <ul>
        {loading ? (
          <div
            style={{ color: "#bbb", fontWeight: "600", textAlign: "center" }}
          >
            Loading...
          </div>
        ) : (
          <>
            {listFriends.length == 0 && (
              <b
                style={{ color: "#999", display: "block", textAlign: "center" }}
              >
                No Friends Added.
              </b>
            )}
            {/*--------------------------*/}
            {listFriends?.map((_f, i) => (
              <li key={i} onClick={() => handleOpenChat(_f)}>
                <div className="cont-img">
                  <img src={_f.userInfo?.photoURL} alt="" />
                </div>
                <div className="other-info">
                  <div className="name--time">
                    <span>{_f.userInfo?.displayName}</span>
                    <span>{_f.userInfo?.date}</span>
                  </div>
                  <div className="message-text--count">
                    <span>xxxxx</span>
                    <span>3</span>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
