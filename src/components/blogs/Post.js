import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PostsContext } from "../../context/postsContext";

export const Post = ({ somePost }) => {
  const { _id, title, postBody, author, images } = somePost;

  const shorted = postBody.substring(0, 1000);

  const imgUrl = `http://localhost:8000/${images}`;

  return (
    <div className="post-container container px-5 py-5">
      <div className="row">
        <div className="col-sm-12 sm-6 col-md-4 d-flex align-center">
          <img className="img-fluid" src={imgUrl} alt="" />
        </div>
        <div className="col-sm-12 sm-6 col-md-8 px-4">
          <h4 className="text-center mt-2 mb-3">{title}</h4>
          <p>{`${shorted}...`}</p>
          <Link className="text-center my-link" to={`post/${_id}`}>
            <p className="" class="h5">
              <i class="bi bi-plus"></i>
              Read more...
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
