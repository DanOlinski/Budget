import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/index.scss'
 
const Home = () => {

    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

    return (
        <div className='outside-container'>
        <div className='container-intro'>
        <button className="start-btn" onClick={() => navigate('/signup')}>Get Started Now</button>
            <div className='main-content'>
            <h1>Change your relationship with money by tracking your spendings easily.</h1>
            <div className='paragraph'>
        <p>Get freedom in how you manage your budgeting categories and link your bank accounts spendings with no hassle.</p>
        
        </div>
        </div>
       
        </div>
        {/* <img src='budget-website/src/components/media/pieChartSpending.png' alt="pie-chart" /> */}
        </div>
    );
};
 
export default Home;