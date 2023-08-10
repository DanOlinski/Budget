import * as React from 'react';
import '../styles/manage.scss';
import useGlobalStates from '../../hooks/useGlobalStates';
import axios from "axios";

export default function DropDownMenu(props) {
  const {
    userId,
    setDefaultCategory,
    setCategories,
    setSelectedCategory,
    setVisitedStores,
    setOpenDialogVisitedStores,
    setOpenDialogCreateCategory,
    setOpenDialogCategoryInfo,

    defaultCategory,
    categories,
    visitedStores,
    selectedCategory,
    spending,
    setSpending,
    rangeDates
  } = useGlobalStates()

  //this cluster of code sets the options shown in dropdown menu
  const storeOptions = ['...']
  const defaultOptions = [defaultCategory.category]
  categories.map((categoryObj) => {
    //prevent from appending the same category twice
    if (categoryObj.category !== defaultCategory.category) {
      defaultOptions.push(categoryObj.category)
    }

    if (categoryObj.category !== props.selected_category || categoryObj.category !== '...') {
      storeOptions.push(categoryObj.category)
    }
  })

  // console.log(defaultCategory)

  const handleDefaultCategoryChange = (e) => {

    const obj = {
      category: e.target.value, 
      budget: null
    }
    
    //find the budget value to update the default categoryCategory state
    categories.map((categoryObj) => {
      if (categoryObj.category === e.target.value) {
        obj.budget = categoryObj.budget
      }
    })

    if(obj.category && obj.budget){
      setDefaultCategory(obj);

    }
  }

  const handleStoreCategoryChange = (e) => {

    //set the sate that holds values with the relation between store name and category it should be appended to
    const categoryObj = { ...selectedCategory }
    categoryObj[props.store_name] = e.target.value
    setSelectedCategory(categoryObj)

    //This used to resets the state of spending 
    const spendingObj = {
       for_default_category: [],
       for_selected_categories: [] 
      }

    //update spending.for_selected_category
    if(
      //before mapping always check if value can be mapped without crashing
      Array.isArray(spending.for_selected_categories) && 
      spending.for_selected_categories.length > 0
    ){
      
      spending.for_selected_categories.map((obj)=>{
        //if the mapped object is does not have store_name equal to the store we want to currently update, add that stores(without applying changes to it) to the spending state
        if(props.store_name !== obj.store_name){
          spendingObj.for_selected_categories.push(obj)
        }

        //if the mapped object has store_name equal to the store we want to currently update:
        if(props.store_name === obj.store_name){

          //create an object with the spending object we found(one that needs to be updated)
          const updatedStoreObj = { ...obj }

          //if we are setting a store to not have a selected category, set the selected_category to null
          if(e.target.value === '...'){
            //update the selected_category key within the object we created updatedStoreObj
            updatedStoreObj.selected_category = null

            //push the updatedStoreObj into the array spendingObj.for_default_category
            spendingObj.for_default_category.push(updatedStoreObj)
          }

          //if we are setting a store to have a selected category, set the selected_category to equal the category that was selected in the dropdown menu. This info is stored in e.target.value
          if(e.target.value !== '...'){
            //update the selected_category key within the object we created updatedStoreObj
            updatedStoreObj.selected_category = e.target.value

            //push the updatedStoreObj into the array spendingObj.for_selected_category
            spendingObj.for_selected_categories.push(updatedStoreObj)
          }

        }
      })

      setSpending(spendingObj)

    }
    
    //update spending.for_default_category
    if (
      //before mapping always check if value can be mapped without crashing
      Array.isArray(spending.for_default_category) && 
      spending.for_default_category.length > 0
    ){
      //map default category
      spending.for_default_category.map((obj)=>{

        //if the mapped object is does not have store_name equal to the store we want to currently update, add that stores(without applying changes to it) to the spending state
        if(props.store_name !== obj.store_name){
          spendingObj.for_default_category.push(obj)
        }

        //if the mapped object has store_name equal to the store we want to currently update:
        if(props.store_name === obj.store_name){
          
          //create an object with the spending object we found(one that needs to be updated)
          const updatedStoreObj = { ...obj }

          //if there is an object in the default categories that is being set from selected_category = null to selected_category = e.target.value. Then update that key inside the updatedStoreObj then push that object into the spendingObj.for_selected_categories array
          if(e.target.value !== '...'){
            updatedStoreObj.selected_category = e.target.value
            spendingObj.for_selected_categories.push(updatedStoreObj)
          }
        }
      })
      setSpending(spendingObj)
    }

    //for some reason if I try to change selected categories without closing then opening the dialog box the functionality breaks. that's why I added the code below to automatically close the dialog box
    setOpenDialogVisitedStores(false);
    setOpenDialogCreateCategory(false);
    setOpenDialogCategoryInfo(false)
  }

  // update selected_category when state changes
  React.useEffect(() => {
    let categoryName = null

    if(selectedCategory[props.store_name] !== '...'){
      categoryName = selectedCategory[props.store_name]
    }

    axios.put(
      `inserts/assign_category_to_spending`,
      {
        user_id: userId,
        category: categoryName,
        store_name: props.store_name,
        start_date: `${rangeDates.start_date}`,//'2021-01-01T00:00:00Z',
        end_date: `${rangeDates.end_date}`//'2023-08-01T00:00:00Z'
      }
    )

  }, [selectedCategory]);

  //render the dropdown list
  const storeDropDownList = storeOptions.map((option, index) => {
    return (
      <option
        className='dropdown--menu'
        id={index}
        value={option}
      >
        {option}
      </option>
    )
  })

  //render the default dropdown list
  const defaultDropDownList = defaultOptions.map((option, index) => {
    return (
      <option
        className='dropdown--menu'
        id={index}
        value={option}
      >
        {option}
      </option>
    )
  })

  return (
    <div>
      {
        props.default ?
          <div className='dialog--default'>
            <div>
              Default
            </div>

            <select
              className='dropdown'
              value={defaultCategory.category}
              onChange={handleDefaultCategoryChange}
            >
              {defaultDropDownList}
            </select>
          </div>
          :
          <>
            <select
              className='dropdown'
              value={selectedCategory[props.store_name]}
              onChange={handleStoreCategoryChange}
            >

              {storeDropDownList}

            </select>
          </>
      }
    </div>
  );
}
