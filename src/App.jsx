import "./App.scss";
import React from "react";
import MyRoutes from "./Pages/MyRoutes";
////////////////
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
////////////////

function App() {
  return (
    <div className="App">
      <MyRoutes />
      {/* for Toast */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
