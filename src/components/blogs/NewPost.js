import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import postsApi from "../../helpers/postsApi";
import jwtDecode from "jwt-decode";
import { PostsContext } from "../../context/postsContext";

export const NewPost = ({ setNewPost }) => {
  const { userState } = useContext(AuthContext);
  const { setReload } = useContext(PostsContext);
  const { _id } = jwtDecode(userState.user?.token);

  const initialValue = {
    title: "",
    postBody: "",
    author: _id,
  };
  const [formValue, setFormValue] = useState(initialValue);

  const onInputChange = ({ target }) => {
    const { value, name } = target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let config = {
        headers: {
          authorization: "Bearer " + userState.user.token,
        },
      };
      const res = await postsApi.post("posts", formValue, config);
      setFormValue(initialValue);
      setReload(true);
      setNewPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <label>title</label>
        <input
          className="form-control"
          name="title"
          onChange={onInputChange}
          value={formValue.title}
        />
        <div class="form-text">Write a title</div>
        <textarea
          name="postBody"
          onChange={onInputChange}
          className="form-control"
          value={formValue.postBody}
        />
        <div class="form-text">Write a post</div>
        <button onClick={setNewPost}> cancel</button>
        <button type="submit"> send </button>
      </form>
    </div>
  );
};
