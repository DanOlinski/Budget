import React, {useState} from 'react';
// import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
 
const Login = ({onFormSwitch}) => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const testAuthData = {
        email: 'test@gmail.com',
        pass: 'test',
      }; 
      const authenticateUser = (email, pass) => {
        if (email === testAuthData.email && pass === testAuthData.pass) { 
          const userData = {
            email,
            pass,
          };
          // const expirationTime = new Date(new Date().getTime() + 60000);
          // Cookies.set('auth', JSON.stringify(userData), { expires: expirationTime });
          localStorage.setItem('auth', JSON.stringify(userData));
          return true;
        }
        return false;
      };

      const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
      
        try {
          const isAuthenticated = authenticateUser(email, pass);
          // axios request to login post
      
          if (isAuthenticated) {
            onFormSwitch();
            navigate('/dashboard');
          } else {
            console.log("Authentication failed.");
          }
        } catch (error) {
          console.log("An error occurred while trying to log you in:", error.message);
          // You can handle the error here or show an error message to the user
        }
      };

    return (
        <div className="authentication-form-container">
            <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}> 
            <label>email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label>password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit">Login</button>
            </form>

            <button className="link-btn" onClick={() => navigate('/signup')}>Don't have an account? Register here.</button>
            </div>
    );


};
 
export default Login;