import React, { useState } from 'react';
import axios from 'axios';
import Error from './helpers/error';
import '../styles/dashboard.accountform.scss';
import useGlobalStates from '../../hooks/useGlobalStates';
 
export default function AddNewAccountForm(props) {

  const { setTriggerDashboardDownload } = useGlobalStates()

  const userId = localStorage.getItem('auth');

    const [bank, setBank] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);


    const folder_url = 'https://graph.microsoft.com/v1.0/users/final.project.lhl@outlook.com/mailFolders/AQMkADAwATMwMAItNjJkOC0xMzJiLTAwAi0wMAoALgAAAy3KWEvbj4tIvxN9uTIgazUBAMVxau0anYpLoRd2HmPfL1sAAAAEH75WAAAA'

    const data = {
      user_id: userId,
      bank : bank,
      token : token,
      folder_url: folder_url
    };

    console.log(data);

      const handleSubmitAccount = (e) => {
        e.preventDefault();
        props.toggle();

        if (data.bank && data.token) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };

          axios.post("inserts/new_account", data, config)
          .then((res) => {
            console.log(res);
            const data = res.data;
            console.log(data);
            const randomNumber = Math.random();
            setTriggerDashboardDownload(randomNumber);
          })
          .catch((error) => {
            console.log("An error occurred while trying to add a new bank account", error.message)
            setError(error.response.data.error);
          });
      };
    };

    return (
      <div className="popup">
      <div className="popup-inner">
          
          <button className="close-button" onClick={props.toggle}>&#10005;</button>
          <h2 className='label-account'>Add New Bank Account</h2>
          {error && <Error error={error} />} {/* Render the Error component with the error message */}
          <form clasName='account-form' onSubmit={handleSubmitAccount}>
              <label>
                  Bank Name
                  <input type="text" value={bank} onChange={e => setBank(e.target.value)} />
              </label>
              <label>
                  Unique Token
                  <input type="text" value={token} onChange={e => setToken(e.target.value)} />
              </label>
              <button type="submit">Submit</button>
          </form>
      </div>
  </div>
    );

    }