import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#222",
      }}
    >
      <div
        style={{
          color: "#bbb",
          fontSize: "3rem",
          fontWeight: "900",
          textAlign: "center",
          paddingTop: "6%",
        }}
      >
        Error (Page Not Found
        <span style={{ color: "red", fontSize: "7rem" }}>!</span>)
      </div>
      <button
        style={{
          display: "block",
          margin: "50px auto",
          fontSize: "1.8rem",
          fontWeight: "600",
          padding: "10px",
          borderRadius: "6px",
          cursor: "pointer",
          background: "#bbb",
          boxShadow: "0 0 30px #111",
          textShadow: "0 0 15px #111",
        }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
}
