import React from 'react';
import PieChart from '../components/dashboard/helpers/pie-chart';
import '../components/styles/dashboard.scss'
import useDashboardData from '../components/dashboard/hooks/selectors'
import CategoryList from '../components/dashboard/CategoryList';
import useManageApp from '../hooks/useManageApp';

const Dashboard = () => {

//loading info from db into global states from all other pages except from the manage file, to avoid data conflicts
// const userId = localStorage.getItem('auth')
// useManageApp(userId)

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