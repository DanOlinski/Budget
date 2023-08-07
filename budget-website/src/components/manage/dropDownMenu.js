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

  console.log(defaultCategory)

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

    const categoryObj = { ...selectedCategory }
    categoryObj[props.store_name] = e.target.value
    setSelectedCategory(categoryObj)

    const spendingObj = {
       for_default_category: [...spending.for_default_category],
       for_selected_categories: [] 
      }


    if(
      Array.isArray(spending.for_selected_categories) && 
      spending.for_selected_categories.length > 0
    ){
      
      spending.for_selected_categories.map((obj)=>{

        if(props.store_name !== obj.store_name){
          spendingObj.for_selected_categories.push(obj)
        }

        if(props.store_name === obj.store_name){
          const updatedStoreObj = { ...obj }
          
          if(e.target.value === '...'){
            updatedStoreObj.selected_category = null
            spendingObj.for_default_category.push(updatedStoreObj)
          }

          if(e.target.value !== '...'){
            updatedStoreObj.selected_category = e.target.value
            spendingObj.for_selected_categories.push(updatedStoreObj)
          }

        }
      })

      setSpending(spendingObj)

    }
    
    if (
      Array.isArray(spending.for_default_category) && 
      spending.for_default_category.length > 0
    ){
      
      spending.for_default_category.map((obj)=>{

        if(props.store_name === obj.store_name){
          const updatedStoreObj = { ...obj }
          
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
