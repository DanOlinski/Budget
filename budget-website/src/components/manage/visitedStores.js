import * as React from 'react';
import '../styles/manage.scss';
import DropDownMenu from './dropDownMenu'

export default function VisitedStores(props) {

  return (
    <>
    {
      props.renderFor === 'Render For Card' &&
      <div className='stores--card'>
        {props.store_name}
      </div>
    }
    {
      props.renderFor === 'Render For DialogBox' &&
      <div className='stores--dialog'>
      <div>
      {props.store_name}
      </div>
        <DropDownMenu
          selected_category = {props.selected_category}
          store_name = {props.store_name}
        />
      </div>
    }
    </>
  )
}
