import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import PaymentHistory from "./pages/PaymentHistory.jsx";
import Profile from "./pages/Profile.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Sign from "./pages/Sign";
import Email from "./pages/Email.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/sign" element={<Sign />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/email" element={<Email />} />

      </Routes>
    </div>
  );
};

export default App;
