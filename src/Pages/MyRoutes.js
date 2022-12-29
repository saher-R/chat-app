import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ErrorPage from "./ErrorPage";
import Home from "./Home";

export default function MyRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error-page" />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
  );
}
