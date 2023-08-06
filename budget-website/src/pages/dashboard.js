import React from 'react';
import '../components/styles/dashboard.scss'
import useDashboardData from '../components/dashboard/hooks/selectors'
import CategoryList from '../components/dashboard/CategoryList';
import AccountList from '../components/dashboard/AccountList';
import useGlobalStates from '../hooks/useGlobalStates';
 
const Dashboard = () => {
    const { spending } =  useGlobalStates()
    console.log(spending);

    const {
        spendingState
      } = useDashboardData();

    // const categories

    return (
        <div className='dashboard-container'>
        <div className='main-tracker-container'>
            <CategoryList 
            categories={spendingState?.categories} 
            />
        </div>
        <div className='account-container'>
            <AccountList
            accounts={spendingState?.accounts}
            />
       </div>
       </div>

    );
};
 
export default Dashboard;