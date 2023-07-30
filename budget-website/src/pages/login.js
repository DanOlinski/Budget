import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Error from '../components/error';
 
const Login = ({onFormSwitch}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const data = {
      email : email,
      password : password,
    };

      const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

      const handleSubmit = (e) => {
        e.preventDefault();

          const config = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
    
          axios.post("/user/login", data, config)
          .then((res) => {
            console.log(res);
            const data = res.data;
            localStorage.setItem('auth',data.userId);
            console.log('set item');
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
            <h2>Login</h2>
            {error && <Error error={error} />} {/* Render the Error component with the error message */}
        <form className="login-form" onSubmit={handleSubmit}> 
            <label>email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label>password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit">Login</button>
            </form>

            <button className="link-btn" onClick={() => navigate('/signup')}>Don't have an account? Register here.</button>
            </div>
    );


};
 
export default Login;