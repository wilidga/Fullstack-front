import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import jwtDecode from "jwt-decode";
import postsApi from "../../helpers/postsApi";
import { useNavigate, useParams } from "react-router-dom";

export const NewComment = () => {
  const { userState } = useContext(AuthContext);
  const navigate = useNavigate();
  const { _id: userID } = jwtDecode(userState.user?.token);
  const params = useParams();

  const [form, setForm] = useState();
  const [archivo, guardarArchivo] = useState("");

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form) {
      alert("comment is required");
      return;
    }

    const formData = new FormData();
    formData.append("comment", form);
    formData.append("image", archivo);
    formData.append("author", userID);

    try {
      let config = {
        headers: {
          authorization: "Bearer " + userState.user.token,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await postsApi.post(
        `posts/${params.id}/comments`,
        formData,
        config
      );
      alert(data.msg);
    } catch (error) {
      alert(error.response.data.msg);
    }
    setForm(" ");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="m-5">
          <textarea
            class="form-control"
            onChange={(e) => setForm(e.target.value)}
            // type="text"
            value={form}
          />
          <div class="form-text">Write a comment</div>

          <input
            class="form-control mt-3 mb-4"
            type="file"
            name="imagen"
            onChange={leerArchivo}
          />
          <div class="form-text mb-3">Upload an image</div>
          <input className="my-btn" type="submit" value="submit" />
        </div>
      </form>
      <button
        className="back"
        onClick={() => navigate(`/post/${params.id}`)}
      >
        {" "}
        <i class="bi bi-backspace"></i> back{" "}
      </button>
    </div>
  );
};
