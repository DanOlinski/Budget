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

    defaultCategory,
    categories,
    visitedStores,
    selectedCategory,
  } = useGlobalStates()

  const storeOptions = ['...']
  const defaultOptions = [defaultCategory]

  categories.map((categoryObj) => {
    //prevent from appending the same category twice
    if (categoryObj.category !== defaultCategory) {
      defaultOptions.push(categoryObj.category)
    }

    if (categoryObj.category !== props.selected_category || categoryObj.category !== '...') {
      storeOptions.push(categoryObj.category)
    }
  })


  const handleDefaultCategoryChange = (e) => {
    setDefaultCategory(e.target.value);
  }

  const handleStoreCategoryChange = (e) => {
    const obj = { ...selectedCategory }
    obj[props.store_name] = e.target.value
    setSelectedCategory(obj)
  }

  // update selected_category when state changes
  React.useEffect(() => {
    axios.put(
      `inserts/assign_category_to_spending`,
      {
        user_id: userId,
        category: selectedCategory[props.store_name],
        store_name: props.store_name,
        start_date: '2021-01-01T00:00:00Z',
        end_date: '2023-08-01T00:00:00Z'
      }
    )
  }, [selectedCategory]);

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
              value={defaultCategory}
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
