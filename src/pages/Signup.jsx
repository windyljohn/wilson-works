import AuthLayout from "../components/AuthLayout";
import classes from "./Signin.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { username, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExist = storedUsers.some((user) => user.username === username);

    if (userExist) {
      setError("Username already exist.");
      return;
    }

    const newUser = { username, password };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/signin");
  }

  return (
    <AuthLayout>
      <div className={classes.header}>
        <h3>Create an Account</h3>
        <p>Please provide your details to register a new account.</p>
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
          minLength="5"
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          minLength="5"
          onChange={handleChange}
          required
          autoComplete="off"
        />

        {error && <p className={classes["invalid-signup"]}>{error}</p>}

        <button className={classes["button-signup"]} type="submit">
          Sign up
        </button>
      </form>

      <div className={classes["create-account"]}>
        <p>
          Already have an account?
          <Link className={classes.links} to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
