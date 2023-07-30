import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  const data = {
    email,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data.email);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      axios.post("/user/create", data, config)
      .then((response) => {
        console.log(response);
        
      })
    }
      catch(error) {
        console.log("An error occurred while trying to create the user:", error.message)
      };
    };

  return (
    <div className="authentication-form-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label>password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
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
