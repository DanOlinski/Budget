import React from 'react';
import PieChart from '../components/dashboard/helpers/pie-chart';
import '../components/styles/dashboard.scss'
import useDashboardData from '../components/dashboard/helpers/selectors'
import CategoryList from '../components/dashboard/CategoryList';
 
const Dashboard = () => {

    const {
        state
      } = useDashboardData();

    // const categories

    return (
        <div className='main-tracker-container'>
            <CategoryList 
            categories={state.categories} />
        </div>
    );
};
 
export default Dashboard;