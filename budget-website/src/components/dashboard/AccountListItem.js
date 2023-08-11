import React from "react";
import '../styles/dashboard.scss'

function AccountListItem({ bank, holdings, cards }) {
  return (
    <div className='all-account-info'>
    <div className='info-account-name-holdings'>
      <div className='bank-name'>
        {bank}
      </div>
      
      {/* <div className='info-account-details'> */}
        <div className='holdings'>
          {holdings !==  null ? (
            `$ ${holdings}`
          ) : (
            '$ 0.00'
          )}
          
        </div>
        </div>

        <div className='cardsDisplay'>
          {cards.map((cardNumber, index) => (
            <div key={index}>{cardNumber}</div>
          ))}
        </div>
        </div>
  );
}

export default AccountListItem;