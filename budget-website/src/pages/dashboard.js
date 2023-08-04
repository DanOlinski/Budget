import React from 'react';
import PieChart from '../components/dashboard/helpers/pie-chart';
import '../components/styles/dashboard.scss'
import useDashboardData from '../components/dashboard/hooks/selectors'
import CategoryList from '../components/dashboard/CategoryList';
 
const Dashboard = () => {

    const {
        spendingState
      } = useDashboardData();

    // const categories

    return (
        <div className='main-tracker-container'>
            <CategoryList 
            categories={spendingState?.categories} 
            />
        </div>

    );
};
 
export default Dashboard;