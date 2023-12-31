import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
// import Cookies from 'js-cookie';
import Home from './pages';
import SignUp from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Manage from './pages/manage';
import ResponsiveAppBar from './components/Navbar';
import { history } from '../src/helpers/history'
import useManageApp from './hooks/useManageApp';
const userId = localStorage.getItem('auth')

// disableReactDevTools()

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth'));

    const handleLogout = () => {
      localStorage.removeItem('auth');
      localStorage.removeItem('selectedStartDate');
      localStorage.removeItem('selectedEndDate');
      localStorage.removeItem('email');
      setIsAuthenticated(false);
      window.location.href = "/login"
    };
  
    const handleLogin = () => {  
      setIsAuthenticated(true);
    };

    const handleSignUp = () => {
      setIsAuthenticated(true);
    }

    //loading info from db into global states from all other pages except from the manage file, to avoid data conflicts
    useManageApp(userId)



    return (
        <Router history={history}>
           <ResponsiveAppBar isAuthenticated={isAuthenticated} 
           onLogout={handleLogout} />
           <div className="App">
            <Routes>
            <Route path="/login" element={<Login onFormSwitch={handleLogin} />} />
            <Route path="/signup" element={<SignUp onFormSwitch={handleSignUp} />} />
            <Route path="/" element={<Home />} />
            

                {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage" element={<Manage/>} />
            </>
                ) : null}
                
            </Routes>
            </div>
        </Router>
        
    );
}
 
export default App;
