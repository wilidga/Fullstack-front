import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../context/postsContext";
import postsApi from "../../helpers/postsApi";
import { NewPost } from "./NewPost";
import { useNavigate } from "react-router-dom";

import { Post } from "./Post";
import types from "../../context/types";

export const ListOfPost = () => {
  const navigate = useNavigate();
  const { reload, setReload, state, dispatch } = useContext(PostsContext);
  const { posts } = state;
  const [newPost, setNewPost] = useState(false);
  const [postState, setPostState] = useState([]);

  const refreshPosts = async () => {
    const { data } = await postsApi.get("posts");
    const posts = data.posts;
    dispatch({ type: types.refreshData, payload: posts });
  };

  useEffect(() => {
    if (reload) {
      refreshPosts();
      navigate("/");
      setReload(false);
    }
  }, [reload]);
  return (
    <>
      <div className="mt-3 mb-1">
        <div className="d-flex align-items-center  justify-content-center">
          <button className="my-btn" onClick={() => setNewPost(true)}>
            CREATE POST
          </button>
        </div>
      </div>
      {newPost ? (
        <NewPost setNewPost={() => setNewPost(false)} />
      ) : (
        posts.map((x) => <Post key={x._d} somePost={x} />)
      )}
    </>
  );
};
