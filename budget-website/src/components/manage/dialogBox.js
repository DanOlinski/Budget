import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../styles/manage.scss';
import DropDownMenu from './dropDownMenu'
import VisitedStores from './visitedStores';
import useGlobalStates from '../../hooks/useGlobalStates';
import categoryInfo from '../../helpers/categoryInfo';

export default function DialogBox(props) {
  const { selectedCategory, visitedStores, openDialogVisitedStores, openDialogCreateCategory, setCategories, categories, setNewCategory, openDialogCategoryInfo, spending, setOpenDialogCreateCategory, newCategory, clickedCard, setClickedCard, defaultCategory, setOpenDialogCategoryInfo, setUpdateBudget, userId } = useGlobalStates()

  const { accessDynamicSpendingArrOfObj, spendingSum } = categoryInfo(categories, clickedCard.category, defaultCategory, spending)

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
        <div key={index}>
          <VisitedStores
            tittle={props.tittle}
            renderFor={forWhatComponent}
            store_name={store.store_name}
            selected_category={selectedCategory[store.store_name]}
            key={index+1}
          />
        </div>
      )
    })
  }

  const renderCategoryDialogRows = () => {
    // console.log(accessDynamicSpendingArrOfObj(), 'this should be an ARRAY')
    return accessDynamicSpendingArrOfObj().map((obj, index) => {
        return (
        <div key={index} className='dialog--categoriesCard--rows--singleRow'>
          <div key={index+1} className='dialog--categoriesCard--rows--div'>
          {obj.store_name}
          </div>
          <div key={index+2} className='dialog--categoriesCard--rows--div'>
          {' - '}
          </div>
          <div key={index+3} className='dialog--categoriesCard--rows--div'>
          {'$'}{obj.amount_spent}
          </div>
          <div key={index+4} className='dialog--categoriesCard--rows--div'>
          {' - '}
          </div>
          <div key={index+5}>
          {obj.bank}
          </div>

          <DropDownMenu
            key={index+6}
            selected_category = {obj.selected_category}
            store_name = {obj.store_name}
            default={false}
          />

        </div>
      )
    })
  }

  const handleSaveNewCategory = (e) => {
    if(e.target.category.value && e.target.budget.value){

      setOpenDialogCreateCategory(false)

    const obj = {
      category: e.target.category.value, 
      budget: e.target.budget.value
    }

    let arr = [ ...categories, obj ]

    setCategories(arr)
    setNewCategory(obj)
    }
  }
  
  const handleSaveNewBudget = (e) => {
    const objSetUpdateBudget = {
      user_id: userId,
      category: clickedCard.category,
      budget_limit: e.target.newbudget.value
    }
    
    const objSetCategories = {
      category: clickedCard.category, 
      budget: e.target.newbudget.value
    }

    let finalArr = categories
    if(Array.isArray(categories) && categories.length > 0){
      finalArr = []
      categories.map((category) => {
        if(category.category !== clickedCard.category){
          finalArr.push(category)
        }
        if(category.category === clickedCard.category){
          finalArr.push(objSetCategories)
        }
      })
    }
    setCategories(finalArr)
    setUpdateBudget(objSetUpdateBudget)

    setOpenDialogCategoryInfo(false)
  }

  return (
    <>
      {// if openDialogVisitedStores is true open this dialog
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

            <div>
              
              <DropDownMenu
                default={true}
              />

              {renderStore('Render For DialogBox')}

            </div>
          
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

            <form className='dialog--newcat--form'
              type="submit"
              onSubmit={event => event.preventDefault()}
              onSubmitCapture={handleSaveNewCategory}
            >
              
              <input
                className='dialog--newcat--input'
                placeholder="Category Name"
                type="text"
                name='category'
              />

              <input
                className='dialog--newcat--input'
                placeholder="Target Budget"
                type="text"
                name="budget"
              />

              {/* buttons */}
                <div className='dialog--newcat--button'>

                  <div
                    className='dialog--newcat--button--cancel'
                    onClick={props.onClose}
                  >
                    Cancel
                  </div>

                  <input
                    className='dialog--newcat--button--save'
                    type="submit"
                    value="Save"
                    name='Save'
                  />

                </div>

            </form>



          </DialogContent>

        </Dialog>
      }
      {
        // if openDialogCategoryInfo is true, render this popup
        <Dialog
          open={openDialogCategoryInfo}
          onClose={props.onClose}
          scroll={props.scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >

          <DialogTitle id="scroll-dialog-title" className='dialog--tittle'>
            {clickedCard.category}
          </DialogTitle>

          <DialogContent dividers={`${props.scroll}` === 'paper'} className='dialog--categoriesCard'>

            
            <form className='dialog--categoriesCard--form'
              type="submit"
              onSubmit={event => event.preventDefault()}
              onSubmitCapture={handleSaveNewBudget}
            >

              <div className='dialog--categoriesCard--header'>
                <div className='dialog--categoriesCard--budget'>
                {'Budget '}
                <input
                className='dialog--categoriesCard--input'
                placeholder={`$${clickedCard.budget}`}
                type="text"
                name="newbudget"
              />
                </div>
              

              <div className='dialog--categoriesCard--total'>
                {'Spent $'}
                {spendingSum()}
              </div>

              </div>

              <hr className='dialog--categoriesCard--hr'/>

              <div className='dialog--categoriesCard--rows'>
              {renderCategoryDialogRows()}
              </div>

              {/* buttons */}
                <div className='dialog--categoriesCard--button'>

                  <div
                    className='dialog--categoriesCard--button--cancel'
                    onClick={props.onClose}
                  >
                    Cancel
                  </div>

                  <input
                    className='dialog--categoriesCard--button--save'
                    type="submit"
                    value="Save"
                    name="Save"
                  />

                </div>

            </form>



          </DialogContent>

        </Dialog>
      }
    </>
  );
}
