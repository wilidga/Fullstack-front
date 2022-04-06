import React from "react";
import { Link } from "react-router-dom";

export const Comment = ({ comment }) => {
  const shorted = comment.comment.substring(0, 255);

  return (
    <div>
      <blockquote cite="https://datatracker.ietf.org/doc/html/rfc1149">
        <q class="text-muted">{`${shorted} ...`}</q>
      </blockquote>
      <figcaption style={{ textAlign: "right" }}>
        {` — ${comment.author.fullName}`}
      </figcaption>

      <Link className="my-link" to={`comment-detail/${comment._id}`}>
        [see the comment +]
      </Link>
      <hr />
    </div>
  );
};
