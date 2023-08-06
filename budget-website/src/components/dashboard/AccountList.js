import { React, useState } from "react";
import AddNewAccountForm from "./NewAccountForm";
import AccountListItem from "./AccountListItem";
import DownloadEmails from "./DownloadEmailsForm";

export default function AccountList(props) {
//   const [seen, setSeen] = useState(false);

//   function togglePop () {
//     setSeen(!seen);
// };

const [showNewAccountForm, setShowNewAccountForm] = useState(false);
const [showDownloadEmailsForm, setShowDownloadEmailsForm] = useState(false);

const toggleNewAccountForm = () => {
  setShowNewAccountForm(!showNewAccountForm);
}

const toggleDownloadEmailsForm = () => {
  setShowDownloadEmailsForm(!showDownloadEmailsForm);
}

  const account = props.accounts.map((account) => (
    <div key={account.id} className='account-item'>
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
    </div>
  ));

  return (
    <ul className='account-list'>
      {account}

      <div>
          <button className='download-emails-but' onClick={toggleNewAccountForm}>Add a New Account</button>
          {showNewAccountForm && <AddNewAccountForm toggle={toggleNewAccountForm} />}
      </div>
  </ul>
  );
}