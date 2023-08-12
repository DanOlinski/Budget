import axios from 'axios';
import { useState, useEffect } from 'react';
import calculateSpendingByCategory from './categories-spending';
import useGlobalStates from '../../../hooks/useGlobalStates';

export default function useDashboardData() {

  const { spending, triggerDashboardDownload } = useGlobalStates();

  const userId = localStorage.getItem('auth');

  // console.log(userId)
  // const data = {
  //   user_id: 1, 
  //   start_date: '2021-01-01T00:00:00Z', 
  //   end_date: '2023-08-01T00:00:00Z'}

    const [spendingState, setSpendingState] = useState({
      state: 'January',
      categories: [],
      accounts: [], 
      spendingTotal: {}
    });

  useEffect(() => {
    Promise.all([
      axios.get(`/getters/categories/${userId}`),
      //crashing due to no account present for a given user
      axios.get(`/getters/accounts_details_by_user/${userId}` ),
    ]).then((all) => {
        // console.log("axios request to get all cat and accounts",all);
      setSpendingState(prev => ({
        ...prev, 
        categories: all[0].data,
        accounts: all[1].data
      }));
    }).catch((error) => {
      console.log("An error occurred:", error.message)
    });
  },[triggerDashboardDownload]);

  function spendingByDates(startDate, endDate) {
    const convertDateToISO = (date) => {
      let dateFunc = new Date(date)
      return dateFunc.toISOString()
    }

    const data = {
      user_id: userId, 
      start_date: `${convertDateToISO(startDate)}`, 
      end_date: `${convertDateToISO(endDate)}`}

    axios.post('/getters/spending', data)
    .then((res) => {
      const data = res.data;
      console.log("this is the data gotten from axios", data);
      let spendingCalculation = calculateSpendingByCategory(data);
      setSpendingState({
        ...spendingState,
        spendingTotal: spendingCalculation
      });
      
    })
    .catch((error) => {
      console.log("An error occurred:", error.message)
    });
  };

  return { spendingState, spendingByDates };

  }


