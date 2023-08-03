import * as React from 'react';
import '../styles/manage.scss';
import AddIcon from './addIcon';

export default function Card(props) {
  return (
    <div className='manage--card'>
      {/* render a card with all stores listed */}
      {
        props.renderStores &&
        <div>

          <div className='manage--card--header'>
            {props.tittle}
          </div>
          <hr />
          <div className='manage--card--bg'>
            <div className='manage--card--bg--body'>
              {props.renderStoreComponent}
            </div>
          </div>

        </div>
      }

      {/* render add button */}
      {
        props.addCategory &&
        <AddIcon />
      }

    </div>
  )
}
