import { Routes, Route } from "react-router-dom";
import { Auth } from "../components/Auth";
import { ListOfPost } from "../components/blogs/ListOfBlogs";
import { PostDetail } from "../components/blogs/PostDetail";
import { CommentDetail } from "../components/comments/CommentDetail";
import { NewComment } from "../components/comments/NewComment";
import { Layout } from "../components/Layout";
import { Login } from "../components/Login";
import { NavBar } from "../components/NavBar";
import { DashBoardPublicRoutes } from "./DashBoardPublicRoutes";
import { DashBoardRoutes } from "./DashBoardRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        {/* <Route
          path="/*"
          element={
            <PublicRoutes>
              <DashBoardPublicRoutes />
            </PublicRoutes>
          }
        />
        <Route path="/" element={<ListOfPost />}>
          {" "}
        </Route>
        <Route
          path="/priv"
          element={
            <PrivateRoutes>
              <DashBoardRoutes />
            </PrivateRoutes>
          }
        /> */}
        <Route path="/" element={<ListOfPost />} />
        <Route path="login" element={<Login />} />
        <Route path="auth" element={<Auth />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="post/:id/create-comment" element={<NewComment />} />
        <Route
          path="post/:id/comment-detail/:idcomment"
          element={<CommentDetail />}
        />
      </Routes>
    </Layout>
  );
};
