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
  const { selectedCategory, visitedStores, openDialogVisitedStores, openDialogCreateCategory } = useGlobalStates()

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (openDialogVisitedStores || openDialogCreateCategory) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialogVisitedStores, openDialogCreateCategory]);

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
    })
  }

  return (
    <>
      {// id opnDialogVisitedStores is true open this dialog
        <Dialog
          open={openDialogVisitedStores}
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
      }
      {
        // if openDialogCreateCategory is true, render this popup
        <Dialog
          open={openDialogCreateCategory}
          onClose={props.onClose}
          scroll={props.scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >

          <DialogTitle id="scroll-dialog-title" className='dialog--tittle'>
            CREATE NEW CATEGORY
          </DialogTitle>

          <DialogContent dividers={`${props.scroll}` === 'paper'} className='dialog--newcat'>
            <div>
          
          <form>
            <div>
              <input 
              className='dialog--newcat--input' 
              placeholder="Category Name" 
              type="text" 
              id="fname" 
              name="fname" />
            </div>
            <div>  
              <input 
                className='dialog--newcat--input' 
                placeholder="Target Budget"
                type="text" 
                id="lname" 
                name="lname" />
            </div>
          </form>

          <div className='dialog--newcat--save'>
            <div className='dialog--newcat--save--button'>
            Cancel
            </div>

            <div className='dialog--newcat--save--button'>
            Save
            </div>

          </div>
          
          </div>
          </DialogContent>

        </Dialog>
      }
    </>
  );
}
