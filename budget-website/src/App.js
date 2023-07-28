import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
// import Cookies from 'js-cookie';
import Home from './pages';
import SignUp from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Category from './pages/category';
import ResponsiveAppBar from './components/Navbar';
import axios from 'axios';

// axios.get('https://localhost:8000/debug/queryGetRequest/1')
// .then((res) => {
//   console.log(res)});
  
  try {
await axios.get('https://localhost:8000/debug/queryGetRequest/1');
  } catch(error) {
    console.log(error);
  }


 
function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth'));

    const handleLogout = () => {
      localStorage.removeItem('auth');
      setIsAuthenticated(false);
    };
  
    const handleLogin = () => {  
      setIsAuthenticated(true);
    };

    return (
        
        <Router>
           <ResponsiveAppBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
           <div className="App">
            <Routes>
            <Route path="/login" element={<Login onFormSwitch={handleLogin} />} />
            <Route path="/signup" element={<SignUp onFormSwitch={() => {}} />} />
            <Route path="/" element={<Home />} />

                {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
            </>
                ) :null }
                
            </Routes>
            </div>
        </Router>
        
    );
}
 
export default App;
