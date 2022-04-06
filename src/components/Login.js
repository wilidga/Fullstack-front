import { useState } from "react";
import { HandleForm } from "../helpers/customHook";
import { Layout } from "./Layout";
import postsApi from "../helpers/postsApi";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const initialValue = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  };
  const [formValue, onInputChange, resetForm] = HandleForm(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);
    try {
      const res = await postsApi.post("users", formValue);
      // navigate(`/auth`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="first name"
          name="firstName"
          onChange={onInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          onChange={onInputChange}
        />
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
        <button type="submit">login</button>
        <Link to="/auth">sing in with my account</Link>
      </form>
    </div>
  );
};
