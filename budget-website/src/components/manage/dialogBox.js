import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../styles/manage.scss';
import DropDownMenu from './dropDownMenu'
import VisitedStores from './visitedStores';
import useGlobalStates from '../../hooks/useGlobalStates';

export default function DialogBox(props) {
  const { selectedCategory, visitedStores } = useGlobalStates()
  
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  const renderStore = (forWhatComponent) => {
    return visitedStores.map((store, index) => {

    return (
      <>
      <VisitedStores
        tittle={props.tittle}
        renderFor={forWhatComponent}
        store_name={store.store_name}
        selected_category={selectedCategory[store.store_name]}
        id={index}
      />
      </>
      )
  })}

  return (
      <Dialog
      open={props.open}
      onClose={props.onClose}
      scroll={props.scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      >
    
       <DialogTitle id="scroll-dialog-title" className='dialog--tittle'>
        {props.tittle}
      </DialogTitle>

       <DialogContent dividers={`${props.scroll}` === 'paper'} className='dialog'>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
              <DropDownMenu 
                default={true}
              />
              
              {renderStore('Render For DialogBox')}

          </DialogContentText>
      </DialogContent>

      </Dialog>
  );
}
