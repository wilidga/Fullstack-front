import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import postsApi from "../../helpers/postsApi";

export const EditingComment = ({ commentToUpdate, setEditing, setReload }) => {
  const [comment, setComment] = useState(commentToUpdate.comment);
  const [archivo, guardarArchivo] = useState("");
  const params = useParams();
  const { id, idcomment } = params;
  const navigate = useNavigate();

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const { userState } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    setComment(target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("image", archivo);

    let config = {
      headers: {
        authorization: "Bearer " + userState.user.token,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await postsApi.put(
        `posts/${id}/comments/${idcomment}`,
        formData,
        config
      );
      setEditing(false);
      setReload(true);
    } catch (error) {
      alert(error.response?.data?.msg);
    }
  };
  return (
    <div class="m-5">
      <form class="m-5">
        <div class="m-5">
          <textarea
            class="form-control"
            onChange={handleChange}
            type="text"
            value={comment}
          />
          <div class="form-text">Update the comment</div>
          <input
            class="form-control mt-3 mb-4"
            type="file"
            name="imagen"
            onChange={leerArchivo}
          />
          <div class="form-text mb-3">Upload an image</div>
          <button className="my-btn" onClick={handleClick}>
            submit
          </button>
        </div>
        <button className="back" onClick={() => setEditing(false)}>
          {" "}
          <i class="bi bi-backspace"></i> back{" "}
        </button>
      </form>
    </div>
  );
};
