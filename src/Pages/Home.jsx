import "./Styles/Home.scss";
import React, { useEffect } from "react";
import RightSide from "../Components/RightSide";
import SearchFriends from "../Components/SearchFriends";
import ChatsList from "../Components/ChatsList";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.current_user.user);

  return (
    <div className="Home">
      <main>
        {/* Left Side */}
        <div className="left-side">
          <div className="user-info">
            <div className="info">
              <div className="cont-img">
                <img src={user?.photoURL} alt="" />
              </div>
              <div className="user-name">{user?.displayName}</div>
            </div>
            <div className="settings">
              <ul>
                <li>
                  <i className="bi bi-three-dots-vertical"></i>
                </li>
                <li>
                  <i className="bi bi-archive-fill"></i>
                </li>
                <li>
                  <i className="bi bi-chat-square-dots-fill"></i>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          {/* Search Friends */}
          <SearchFriends />
          {/* Chats List */}
          <ChatsList />
        </div>
        {/* Right Side */}
        <RightSide />
      </main>
    </div>
  );
}
