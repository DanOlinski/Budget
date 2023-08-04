import axios from 'axios';
import { useState, useEffect } from 'react';
import calculateSpendingByCategory from './categories-spending';

export default function useDashboardData() {

  const userId = localStorage.getItem('auth');
  console.log(userId);

  const data = {
    user_id: 1, 
    start_date: '2021-01-01T00:00:00Z', 
    end_date: '2023-08-01T00:00:00Z'}

    const [spendingState, setSpendingState] = useState({
      state: 'January',
      categories: [],
      accounts: [], 
      spending: null
    });

  useEffect(() => {
    Promise.all([
      axios.get('/getters/categories/' + userId),
      axios.get('/getters/accounts_by_user/' + userId),
    ]).then((all) => {
        console.log("axios request to get all cat and accounts",all);
      setSpendingState(prev => ({
        ...prev, 
        categories: all[0].data,
        accounts: all[1].data
      }));
    });
  },[]);

  function spendingByDates(startDate, endDate) {
    const data = {
      user_id: userId, 
      start_date: startDate, 
      end_date: endDate}

      console.log(data);

    axios.post('/getters/spending', data)
    .then((res) => {
      console.log("this is response from post spending",res);
      const data = res.data;
      let spending = calculateSpendingByCategory(data);
      console.log ("this is spending after datacalc", spending);
      setSpendingState({
        ...spendingState,
        spending: spending
      });
      console.log("this is state after setState",spendingState);
      console.log(spendingState.spending);
      
    })
    .catch((error) => {
      console.log("An error occurred:", error.message)
    });
  };

  // spendingByDates();

  return { spendingState, spendingByDates };

  }

