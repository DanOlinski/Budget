import React, {useState} from 'react';
 
const SignUp = (props) => {
        const [email, setEmail] = useState("");
        const [pass, setPass] = useState("");
        const [name, setName] = useState("");
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(email);
        }
    
        return (
            <div className="authentication-form-container">
                 <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
            <label>full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="yourfullname" id="name" name="name"/> 
                <label>email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label>password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Login</button>
                </form>
    
                <button className="link-btn" onClick={() => props.onFormSwitch("login")}>Already have an account? Login here.</button>
                </div>
        );
};
 
export default SignUp;