import React from "react";
import '../styles/dashboard.scss'

function AccountListItem({ user_id, bank, holdings }) {
  return (
    <div className='info-account'>
      <div>
      {bank} 
      </div>
      <div>
      $ {holdings}
      </div>
      </div>
  );
}

export default AccountListItem;