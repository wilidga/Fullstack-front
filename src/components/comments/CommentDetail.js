import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import postsApi from "../../helpers/postsApi";
import { EditingComment } from "./EditingComment";

export const CommentDetail = () => {
  const params = useParams();
  const { id, idcomment } = params;

  const { userState } = useContext(AuthContext);
  const [commentState, setCommentState] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const { data } = await postsApi.get(`posts/${id}/comments/${idcomment}`);
      setCommentState(data.comment);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (reload) {
      fetchPost();
      setReload(false);
    }
  }, [reload]);

  const deletePost = async () => {
    try {
      let config = {
        headers: {
          authorization: "Bearer " + userState.user.token,
        },
      };
      const res = await postsApi.delete(
        `posts/${id}/comments/${idcomment}`,
        config
      );
      navigate(`/post/${id}`);
    } catch (error) {
      alert(error.response?.data?.msg);
    }
  };
  return (
    <>
      {" "}
      <>
        {loading ? (
          <div>cargando...</div>
        ) : (
          <>
            {editing ? (
              <EditingComment
                commentToUpdate={commentState}
                setEditing={setEditing}
                setReload={setReload}
              />
            ) : (
              <>
                <div className=" container px-5 py-5">
                  <div className="row">
                    <div className="col-sm-12 sm-6 col-md-9 d-flex align-items-center">
                      <p>{commentState.comment && commentState.comment}</p>
                    </div>
                    <div className="col-sm-12 sm-6 col-md-3 d-flex flex-column ">
                      <img
                        src={`http://localhost:8000/${commentState.image}`}
                        alt=""
                        className="img-fluid pt-2 mb-4"
                      />
                      <p className="text-center">
                        <span className="my-span">Author:</span>{" "}
                        {` ${commentState?.author?.fullName}`}
                      </p>
                      <p className="text-center">
                        <span className="my-span">Email:</span>
                        {`  ${commentState?.author?.email}`}
                      </p>
                      <div className="d-flex justify-content-between m-0">
                        <button
                          className="my-btn-danger  m-2"
                          onClick={deletePost}
                        >
                          delete
                        </button>
                        <button
                          className="my-btn m-2"
                          onClick={() => setEditing(true)}
                          style={{ display: "block" }}
                        >
                          update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="back"
                  onClick={() => navigate(`/post/${id}`)}
                >
                  {" "}
                  <i class="bi bi-backspace"></i> back{" "}
                </button>
              </>
            )}
          </>
        )}
      </>
    </>
  );
};
