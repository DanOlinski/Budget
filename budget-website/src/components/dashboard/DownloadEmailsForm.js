import React, {useState} from 'react';
import axios from 'axios';
import Error from './helpers/error';
import '../styles/dashboard.accountform.scss';
import useGlobalStates from '../../hooks/useGlobalStates';
 
const DownloadEmails = (props) => {

  const { userId } = useGlobalStates()

    const [token, setToken] = useState('');
    const [error, setError] = useState(null);

    // const bank = 'Scotiabank'

    const data = {
      user_id: userId,
      token : token,
      bank : 'Scotiabank',
      start_date: '2020-10-01T00:00:00Z',
      end_date: '2023-08-01T00:00:00Z'
    };

    console.log(data);

      const handleSubmitDownload = (e) => {
        e.preventDefault();
        props.toggle();

        if (data.token) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
    
          axios.put("/inserts/download_emails", data, config)
          .then((res) => {
            console.log(res);
            const data = res.data;
            console.log(data);
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
          <h2 className='label-account'>Import Budget Details</h2>
          {error && <Error error={error} />} {/* Render the Error component with the error message */}
          <form clasName='account-form' onSubmit={handleSubmitDownload}>
              <label>
                  Unique Token
                  <input type="text" value={token} onChange={e => setToken(e.target.value)} />
              </label>
              <button type="submit">Submit</button>
          </form>
      </div>
  </div>
    );


};
 
export default DownloadEmails;