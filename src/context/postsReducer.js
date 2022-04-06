import types from "./types";

const postsReducer = (state, action) => {
  switch (action.type) {
    case types.refreshData:
      return {
        ...state,
        posts: [...action.payload],
      };
    case types.deleteData:
      return {
        ...state,
        posts: state.posts.filter((x) => x._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default postsReducer;
