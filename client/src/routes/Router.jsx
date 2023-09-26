import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import { useSelector } from "react-redux";

const Router = () => {
  const auth = useSelector(store=>store.user)
  console.error(auth)
  return (
    <>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path="/login" element={auth ? <Navigate to={'/'}/> : <Login />} />
      </Routes>
    </>
  );
};

export default Router;
