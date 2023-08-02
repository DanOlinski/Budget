import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useDashboardData(initial) {

  const userId = localStorage.getItem('auth');
  console.log(userId);

  useEffect(() => {
      axios.get('/getters/categories/' + userId)
      .then((response) => {
        console.log(response);
      setState(prev => ({
        ...prev, 
        categories: response.data,
      }));
    });
  },[]);


  const [state, setState] = useState({
    state: 'January',
    categories: []
  });

  const spendingByDates = (user_id, start_date, end_date) => {
    const data = {
      user_id: userId,
      start_date: '2021-12-01T00:00:00Z',
      end_date: '2023-06-01T00:00:00Z'
    }

    axios.post('/getters/spending', data)
    .then((res) => {
      console.log(res);
      const data = res.data;
    })
    .catch((error) => {
      console.log("An error occurred while trying to create the user:", error.message)
    });
  };

  console.log(state.categories);

  return (state);
  }


