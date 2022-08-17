import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import "./LoginSignup.css";

import Auth from "../../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // updates state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log(formState);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear the values from the form
    setFormState({
      email: "",
      password: "",
    });

    // redirect user to homepage
    this.props.history.push("/userprofile").catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="wrapper-box">
      <h3 className="card-title red-text">LET'S GET YOU LOGGED IN</h3>
      <form action="login" className="login-form" onSubmit={handleFormSubmit}>
        {/* EMAIL Input */}
        <input
          className="form-1"
          type="email"
          id="user-login"
          name="email"
          placeholder="Your Email"
          value={formState.email}
          onChange={handleChange}
        />

        <br></br>

        {/* password Input */}
        <input
          className="form-1"
          type="password"
          id="password-login"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />

        <br></br>

        <button type="submit">
          Login
        </button>
      </form>

      {/* Shows error if Login fails */}
      {error && <div>Login Failed </div>}
    </div>
  );
};

export default Login;
