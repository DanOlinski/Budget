import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/dashboard/helpers/error";
import '../components/styles/login-signup.scss'

const SignUp = ({ onFormSwitch }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // data pushed to db
  const data = {
    email : email,
    password : password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      // create user
      axios.post("/user/create", data, config)
      .then((res) => {
        const data = res.data;
        // set token for keeping user logged in
        localStorage.setItem('auth',data.userId);
        onFormSwitch();
        navigate('/dashboard');
      })
    .catch((error) => {
        console.log("An error occurred while trying to create the user:", error.message)
        setError(error.response.data.error);
      });
    };

  return (
    <div className="authentication-form-container">
      <h2>Sign Up</h2>
      {error && <Error error={error} />} {/* Render the Error component with the error message */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          required
        />
        <label>password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <button className="link-btn" onClick={() => navigate("/login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default SignUp;
