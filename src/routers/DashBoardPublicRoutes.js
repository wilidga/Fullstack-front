import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth } from "../components/Auth";
import { Login } from "../components/Login";
import { ListOfPost } from "../components/blogs/ListOfBlogs";

export const DashBoardPublicRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="login" element={<Login />}>
            {" "}
          </Route>
          <Route path="auth" element={<Auth />}>
            {" "}
          </Route>
        </Routes>
      </div>
    </>
  );
};
