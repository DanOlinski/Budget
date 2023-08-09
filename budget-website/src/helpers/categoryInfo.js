import '../components/styles/manage.scss';

const categoryInfo = (
  categories,
  propsCategory,
  defaultCategory,
  spending
) => {

  const renderSum = (arrayOfObjs) => {
    if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {
      let sum = 0
      arrayOfObjs.map((spendingObj) => {
        if (spendingObj.amount_spent) {
          sum += Number(spendingObj.amount_spent)
        }
      })
      const round = Math.round((sum * 100) / 100).toFixed(2)

      return (
        <div className='manage--card--spending--total'>
          <div>
            {'Total'}
          </div>
          <div>
            {'$'}{round}
          </div>
        </div>
      )
    }
  }

  const renderBudget = (categories, propsCategory) => {
    if (Array.isArray(categories) && categories.length > 0) {

      return categories.map((category) => {
        if (category.category === propsCategory) {

          return (
            <div className='manage--card--spending--total'>
              <div>
                {'Budget'}
              </div>
              <div>
                {'$'}{category.budget}
              </div>
            </div>
          )

        }
      })


    }
  }

  const renderSpendingForDefaultCat = (arrayOfObjs) => {
    if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {

      return arrayOfObjs.map((spendingObj) => {
        const store_name = spendingObj.store_name
        const amount_spent = spendingObj.amount_spent

        let storeName = store_name
        if (store_name.length > 7) {
          storeName = store_name[0] + store_name[1] + store_name[2] + store_name[3] + store_name[4] + store_name[5] + store_name[6] + '...'
        }

        return (
          <div className='manage--card--spending'>
            <div>
              {storeName}
            </div>
            <div>
              {'$'}{amount_spent}
            </div>
          </div>
        )
      })
    }
  }

  const renderSpendingForSelectedCat = (arrayOfObjs) => {
      
    if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {
        
      return arrayOfObjs.map((spendingObj) => {
        
        if(propsCategory === spendingObj.selected_category) {

          const store_name = spendingObj.store_name
          const amount_spent = spendingObj.amount_spent

          let storeName = store_name
          if (store_name.length > 7) {
            storeName = store_name[0] + store_name[1] + store_name[2] + store_name[3] + store_name[4] + store_name[5] + store_name[6] + '...'
          }

          return (
            <div className='manage--card--spending'>
              <div>
                {storeName}
              </div>
              <div>
                {'$'}{amount_spent}
              </div>
            </div>
          )
        }
      })
    }
  }

  const renderForCardPrev = () => {

    //check that if the card being rendered is the default card. If yes, append
    if (propsCategory === defaultCategory.category) {
      if (spending.for_default_category) {
        return (
          <>
            {renderSum(spending.for_default_category)}
            {renderBudget(categories, propsCategory)}
            {renderSpendingForDefaultCat(spending.for_default_category)}
          </>
        )
      }
    }

    //check that if the card being rendered is not the default card
    if (propsCategory !== defaultCategory.category) {


      if (spending.for_selected_categories) {
        return (
          <>
            {renderSum(spending.for_selected_categories)}
            {renderBudget(categories, propsCategory)}
            {renderSpendingForSelectedCat(spending.for_selected_categories)}
          </>
        )
      }
    }
  }

  const spendingSum = () => {
    
    const sum = (arrayOfObjs) => {
      if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {
        let sum = 0
        arrayOfObjs.map((spendingObj) => {
          if (spendingObj.amount_spent) {
            sum += Number(spendingObj.amount_spent)
          }
        })
        const round = Math.round((sum * 100) / 100).toFixed(2)

        return round
      }
    }

    //check that if the card being rendered is the default card. If yes, append
    if (propsCategory === defaultCategory.category) {
      if (spending.for_default_category) {
        return sum(spending.for_default_category)
      }
    }

    //check that if the card being rendered is not the default card
    if (propsCategory !== defaultCategory.category) {


      if (Array.isArray(spending.for_selected_categories) && spending.for_selected_categories.length > 0) {
        let sumVals = null

        spending.for_selected_categories.map((obj) => {
          if (propsCategory === obj.selected_category) {


            return sumVals = sum(spending.for_selected_categories)
          }
        })

        return sumVals
      }
    }
  }

  const accessDynamicSpendingArrOfObj = () => {

    const returnSpendingForDefaultCat = (arrayOfObjs) => {
      if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {

        return arrayOfObjs.map((obj) => {
          return obj
        })
      }
    }

    const returnSpendingForSelectedCat = (arrayOfObjs) => {
      
      if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {
          
        return arrayOfObjs.map((obj) => {
          if (propsCategory === obj.selected_category) {
            return obj
          }
        })
      }
      
    }

    const dynamicSpendingArrOfObj = () => {

      if (propsCategory === defaultCategory.category) {
        if (spending.for_default_category) {
          return returnSpendingForDefaultCat(spending.for_default_category)
        }
      }

      if (propsCategory !== defaultCategory.category) {
        if (spending.for_selected_categories) {
          return returnSpendingForSelectedCat(spending.for_selected_categories)
        }
      }
    }

    //final return arr construction
    let finalArr = [{
      store_name: null,
      amount_spent: null,
      bank: null,
    }]

    //prevent undefined from being sent out through return
    if (Array.isArray(dynamicSpendingArrOfObj()) && dynamicSpendingArrOfObj().length > 0) {
      // some array items are coming up as undefined, this occurs when none of the if statements pass, there is nothing to return

      finalArr = []
      dynamicSpendingArrOfObj().map((arr) => {

        if (arr !== undefined) {
          finalArr.push(arr)
        }

      })
    }
    
    return finalArr
  }

  const finalObj = {
    renderSum,
    renderBudget,
    renderForCardPrev,
    spendingSum,
    accessDynamicSpendingArrOfObj,
  }
  return finalObj
}

export default categoryInfo