import { useState, useContext } from "react";
import { HandleForm } from "../helpers/customHook";
import { Layout } from "./Layout";
import postsApi from "../helpers/postsApi";
import { AuthContext } from "../context/authContext";

export const Auth = () => {
  const { userState, authUser, logoutUser } = useContext(AuthContext);

  const initialValue = {
    password: "",
    email: "",
  };
  const [formValue, onInputChange, resetForm] = HandleForm(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postsApi.post("users/auth", formValue);
    const { fullName } = res.data.user;
    const token = res.data.token;
    authUser({ token, fullName });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="password"
          name="password"
          onChange={onInputChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={onInputChange}
        />
        <button type="submit">sing in</button>
      </form>
    </div>
  );
};
