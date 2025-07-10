import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../store/slices/authSlice";
import AuthLayout from "../components/AuthLayout";
import classes from "./Signin.module.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { username, password } = form;
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!foundUser) {
      setError("Invalid username or password.");
      return;
    }

    dispatch(login(username));
    navigate("/invoices");
  }

  return (
    <AuthLayout>
      <div className={classes.header}>
        <h3>Login</h3>
        <p>Please enter your email and password:</p>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          minLength="5"
          required
          autoComplete="off"
        />

        {error && <p className={classes.invalid}>{error}</p>}

        <div className={classes["reset-password"]}>
          <Link className={classes.links} to="#">
            Forgot password?
          </Link>
        </div>

        <button className={classes["button"]} type="submit">
          Log in
        </button>
      </form>
      <div className={classes["create-account"]}>
        <p>
          Don't have an account?
          <Link className={classes.links} to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
