import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { PostsContext } from "../../context/postsContext";
import { Comment } from "../comments/Comment";

export const PostDetail = () => {
  const params = useParams();
  const id = params.id;
  const { deletePost, getPostDetail } = useContext(PostsContext);
  const { userState } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const postsFetched = await getPostDetail(id);
      setPost(postsFetched);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      {loading ? (
        <div>cargando...</div>
      ) : (
        <>
          <h2
            style={{ color: "#595959" }}
            className="text-center my-4"
          >{` ${post?.title}`}</h2>
          <p className="mb-4">{post?.postBody}</p>
          <button
            className="my-btn"
            onClick={() => deletePost(id, userState.user.token)}
          >
            delete post
          </button>
          {/* <h4>comments:</h4> */}
          <div className="d-flex  justify-content-end">
            <Link className="my-link h5" to={"create-comment"}>
              {" "}
              <p>
                {" "}
                <i class="bi bi-file-plus"></i>create new comment
              </p>{" "}
            </Link>
          </div>
          {post.comments.map((x) => (
            <Comment key={x._id} comment={x} />
          ))}
        </>
      )}
    </div>
  );
};
