import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import { useSelector } from "react-redux";

export default function SearchFriends() {
  const [search, setSearch] = useState("");
  const [listOfSearched, setListOfSearched] = useState([]);

  async function getSearchFriends(e) {
    if (search.trim() != "" && e?.code == "Enter") {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", search)
      );

      let check = true;
      if (listOfSearched.length > 0) {
        listOfSearched.forEach((f) => {
          if (f.displayName == search) check = false;
        });
      }
      if (check) {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setListOfSearched((prev) => [...prev, doc.data()]);
        });
      }
    }
    //**********************
    if (e?.code == "Backspace" || e?.code == "Delete") {
      // Backspace & Delete Btns..
      setListOfSearched([]);
    }
  }
  useEffect(() => {
    if (search.trim() != "") getSearchFriends();
  }, [search]);

  //------------------------------------------
  // Now add users to Our Chats List...
  const user = useSelector((state) => state.current_user.user);
  async function handleAddToChatsList(friend) {
    // add to currentUser List.
    await setDoc(doc(db, "users", user.uid, "chatsList", friend.displayName), {
      userInfo: friend,
      messages: [],
    });
    // add to oppositeUser List.
    await setDoc(doc(db, "users", friend.uid, "chatsList", user.displayName), {
      userInfo: user,
      messages: [],
    });
  }

  return (
    <div className="search-sec">
      <div className="search-input">
        <i class="bi bi-search"></i>
        <input
          type="text"
          placeholder="Search Friends"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={getSearchFriends}
        />
      </div>
      <ul>
        {listOfSearched?.map((friend) => (
          <li key={friend.uid} onClick={() => handleAddToChatsList(friend)}>
            <div className="cont-img">
              <img src={friend.photoURL} alt="" />
            </div>
            <div className="other-info">
              <div className="name">{friend.displayName}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
