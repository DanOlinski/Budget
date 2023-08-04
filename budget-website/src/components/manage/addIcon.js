import * as React from 'react';
import '../styles/manage.scss';

export default function AddIcon(props) {
  return (
    <div className='manage--addcat'>
      
      <div onClick={props.open} className='manage--addcat--icon1'>
        <div className='manage--addcat--icon2'>
        </div>
      </div>
    </div>
  )
}
