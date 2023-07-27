import React from 'react';
import './App.css';
import { useNavigate, BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './pages';
import SignUp from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Category from './pages/category';
import ResponsiveAppBar from './components/Navbar';

const ProtectedPage = ({ ...rest }) => {
    const isAuthenticated = !!Cookies.get('auth');
    const navigate = useNavigate();
    const handleLogout = () => { 
      Cookies.remove('auth');
      navigate('/login'); 
    };
  
    if (!isAuthenticated) {
      navigate('/login'); 
      return null; // Return null to prevent rendering anything else
    }
  
    return (
      <div>
        <h1 style={{ fontSize: '24px', color: 'blue' }}>Hello, World!</h1>
        <button style={{ marginTop: '10px' }} onClick={handleLogout}>
          Logout
        </button>

        <Dashboard />
      <Category />
      </div>
    );
  };
 
function App() {

    return (
        
        <Router>
           <ResponsiveAppBar />
           <div className="App">
            <Routes>
            
                    (<Route path='/login' element={<Login onFormSwitch={() => {}}/>} />) : 
                    (<Route path='/signup' element={<SignUp onFormSwitch={() => {}}/>} />
                )
                <Route exact path='/' element={<Home />} />
                <Route path='/dashboard' element={<ProtectedPage />} />
                <Route path='/category' element={<ProtectedPage />} />
                
            </Routes>
            </div>
        </Router>
        
    );
}
 
export default App;
