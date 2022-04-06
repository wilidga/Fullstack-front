import { createContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postsApi from "../helpers/postsApi";
import postsReducer from "./postsReducer";
import types from "./types";

export const PostsContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  const initialState = {
    posts: [],
  };

  // const init = () => {
  //   return JSON.parse(localStorage.getItem("todos")) || [];
  // };

  const [state, dispatch] = useReducer(postsReducer, initialState);

  const getPostDetail = async (id) => {
    console.log("el id", id);
    const { data } = await postsApi.get(`posts/${id}`);
    const posts = data.posts;
    return posts;
    // localStorage.setItem("posts", JSON.stringify(posts));
    // dispatch({ type: types.refreshData, payload: posts });
  };

  // useEffect(() => {
  //   if (reload) {
  //     refreshPosts();
  //     navigate("/");
  //     setReload(false);
  //   }
  // }, [reload]);

  const deletePost = async (id, token) => {
    try {
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const resp = await postsApi.delete(`posts/${id}`, config);
      setReload(true);
      dispatch({ type: types.deleteData, payload: id });
    } catch (error) {
      alert(`${error.response.data.msg}!!`);
    }
  };

  return (
    <PostsContext.Provider
      value={{ getPostDetail, deletePost, setReload, reload, dispatch, state }}
    >
      {children}
    </PostsContext.Provider>
  );
};
