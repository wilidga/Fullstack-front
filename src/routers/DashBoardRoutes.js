import React from "react";
import { Route, Routes } from "react-router-dom";

import { PostDetail } from "../components/blogs/PostDetail";

export const DashBoardRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="postic" element={<PostDetail />}></Route>
        </Routes>
      </div>
    </>
  );
};
