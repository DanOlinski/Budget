import * as React from 'react';
import '../styles/manage.scss';
import AddIcon from './addIcon';
import useGlobalStates from '../../hooks/useGlobalStates';
import categoryInfo from '../../helpers/categoryInfo';

export default function Card(props) {
  const { setOpenDialogCreateCategory, setScroll, setOpenDialogVisitedStores, setOpenDialogCategoryInfo, spending, defaultCategory, categoryToDelete, setCategoryToDelete, setCategories, categories, setDefaultCategory, clickedCard, setClickedCard } = useGlobalStates()
  
const handleClickOpenCreateCategory = (scrollType) => () => {
  setOpenDialogCreateCategory(true);
  setScroll(scrollType);
  };

const handleClickOpenCategoryInfo = (scrollType) => () => {
  setOpenDialogCategoryInfo(true);
  setScroll(scrollType);
  setClickedCard({ category: props.category, budget: props.budget })
};

const handleClickOpenVisitedStores = (scrollType) => () => {
  setOpenDialogVisitedStores(true);
  setScroll(scrollType);
};

const deleteCategory = () => {
  const newArr = []
  categories.map((category) => {
    if (category.category !== props.category) {
      newArr.push(category)
    }
  })

  if (props.category !== defaultCategory.category) {
    setCategories(newArr)
    setCategoryToDelete(props.category)
  }

  if (categories.length = 0 && props.category === defaultCategory.category) {
    setCategoryToDelete(props.category)
    setDefaultCategory(['-Default-'])
  }

}

return (
  <div className='manage--card'>
    <div className='manage--cardColor'>

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
        <div>

          <div className='manage--card--header'>
            {props.category}

            <div className='manage--card--x'>
              <div className='manage--card--x--icon' onClick={deleteCategory}>
                x
              </div>
            </div>
          </div>

          <hr />

          <div onClick={handleClickOpenCategoryInfo('paper')} className='manage--card--bg'>
            <div className='manage--card--bg--body'>

              {
                categoryInfo(
                  categories,
                  props.category,
                  defaultCategory,
                  spending
                ).renderForCardPrev()
              }

            </div>
          </div>

        </div>
      }

      {/* render add button */}
      {
        props.addCategory &&
        <AddIcon open={handleClickOpenCreateCategory('paper')} />
      }

    </div>
  </div>
)
}
