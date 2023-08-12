import { React, useState } from "react";
import AddNewAccountForm from "./NewAccountForm";
import AccountListItem from "./AccountListItem";
import DownloadEmails from "./DownloadEmailsForm";
import useGlobalStates from '../../hooks/useGlobalStates';

export default function AccountList(props) {
//   const [seen, setSeen] = useState(false);

const {clickedAccount, setClickedAccount} = useGlobalStates();

//   function togglePop () {
//     setSeen(!seen);
// };

const [showNewAccountForm, setShowNewAccountForm] = useState(false);
const [showDownloadEmailsForm, setShowDownloadEmailsForm] = useState(false);

const toggleNewAccountForm = () => {
  setShowNewAccountForm(!showNewAccountForm);
  
}



  const account = props.accounts.map((account) => {

    const toggleDownloadEmailsForm = () => {
      setShowDownloadEmailsForm(!showDownloadEmailsForm);
      setClickedAccount(account.bank);
    }
    return (<div key={account.id} className='account-item'>

    <div className='account-details'>
  <AccountListItem
  key={account.id}
  id={account.id}
  holdings={account.holdings}
  bank={account.bank}
  cards={account.cards}
    />
  <button className='download-emails-but' onClick={toggleDownloadEmailsForm}>Import Budget Details</button>
  {showDownloadEmailsForm && <DownloadEmails toggle={toggleDownloadEmailsForm} /> }
  </div>
  </div>)
  });

  return (
  //   { accountList.length > 0 ? (
  //   <ul >
  //     accountList
  //     ) : (
  //     <p> No Accounts Linked.</p>
  // )}
 <ul>
  <div className='account-list'>
    {account.length > 0 ? (
      account
    ) : (
      <p>No accounts linked at the moment.</p>
    )}
    </div>

      <div>
          <button className='download-emails-but' onClick={toggleNewAccountForm}>Add a New Account</button>
          {showNewAccountForm && <AddNewAccountForm toggle={toggleNewAccountForm} />}
      </div>


  </ul>
  );
}