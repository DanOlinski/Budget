import * as React from 'react';
import '../styles/manage.scss';
import AddIcon from './addIcon';
import useGlobalStates from '../../hooks/useGlobalStates';

export default function Card(props) {
  const { setOpenDialogCreateCategory, setScroll, setOpenDialogVisitedStores } = useGlobalStates()

  const handleClickOpenCreateCategory = (scrollType) => () => {
    setOpenDialogCreateCategory(true);
    setScroll(scrollType);
  };

  const handleClickOpenVisitedStores = (scrollType) => () => {
    setOpenDialogVisitedStores(true);
    setScroll(scrollType);
  };

  return (
    <div className='manage--card'>
      {/* render a card with all stores listed */}
      {
        props.renderStores &&
        <div onClick={handleClickOpenVisitedStores('paper')}>

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

      {/* render a cards with category */}
      {
        props.renderCategory &&
        <div onClick={handleClickOpenVisitedStores('paper')}>

          <div className='manage--card--header'>
            {props.category}
          </div>
          <hr />
          <div className='manage--card--bg'>
            <div className='manage--card--bg--body'>
              ...
            </div>
          </div>

        </div>
      }

      {/* render add button */}
      {
        props.addCategory &&
        <AddIcon 
          open={handleClickOpenCreateCategory('paper')}
        />
      }

    </div>
  )
}
