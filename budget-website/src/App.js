import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import SignUp from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Category from './pages/category';
import ResponsiveAppBar from './components/Navbar';
 
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
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/category' element={<Category />} />
                
            </Routes>
            </div>
        </Router>
        
    );
}
 
export default App;
