import '../components/styles/manage.scss';

const categoryInfo = (
  categories,
  propsCategory,
  defaultCategory,
  spending
) => {

  const renderSumForSelectedCat = (arrayOfObjs) => {
    let sum = 0.00

    if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {
      
      arrayOfObjs.map((spendingObj) => {

          if(propsCategory === spendingObj.selected_category){
            if (spendingObj.amount_spent) {
              sum += Number(spendingObj.amount_spent)
            }
          }
        
      })

      return (
        <div className='manage--card--spending--total'>
          <div>
            {'Total'}
          </div>
          <div>
            {'$'}{sum.toFixed(2)}
          </div>
        </div>
      )
    } else{return (
      <div className='manage--card--spending--total'>
        <div>
          {'Total'}
        </div>
        <div>
          {'$'}{sum.toFixed(2)}
        </div>
      </div>
    )}

  }

  const renderSumForDefaultCat = (defaultCatArr, selectedCatArr) => {
   
    let sum = 0.00

    //add all values coming from the defaultCatArr
    if (Array.isArray(defaultCatArr) && defaultCatArr.length > 0) {
      
      defaultCatArr.map((spendingObj) => {

          if (spendingObj.amount_spent) {
            sum += Number(spendingObj.amount_spent)
          }
      })

    }

    //add all values coming from the selectedCatArr that have the selected_category = to defaultCategory
    if (Array.isArray(selectedCatArr) && selectedCatArr.length > 0) {
      
      selectedCatArr.map((spendingObj) => {

          if (spendingObj.amount_spent && spendingObj.selected_category === defaultCategory.category) {
            sum += Number(spendingObj.amount_spent)
          }
      })

    }

    return (
      <div className='manage--card--spending--total'>
        <div>
          {'Total'}
        </div>
        <div>
          {'$'}{sum.toFixed(2)}
        </div>
      </div>
    )
  }

  const renderBudget = (categories, propsCategory) => {
    if (Array.isArray(categories) && categories.length > 0) {

      return categories.map((category, index) => {
        if (category.category === propsCategory) {

          return (
            <div className='manage--card--spending--total' key={index}>
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

  const renderSpendingForDefaultCat = (defaultCatArr, selectedCatArr) => {
    let finalArr = []

    //loop though defaultCatArr, place store_name and amount_spent into final arr as an object
    if (Array.isArray(defaultCatArr) && defaultCatArr.length > 0) {

      defaultCatArr.map((spendingObj) => {
        const store_name = spendingObj.store_name
        const amount_spent = spendingObj.amount_spent

        let storeName = store_name

        if (store_name.length > 7) {
          storeName = store_name[0] + store_name[1] + store_name[2] + store_name[3] + store_name[4] + store_name[5] + store_name[6] + '...'
        }

        finalArr.push({storeName, amount_spent})
      })
    }

    //loop though selectedCatArr, place store_name and amount_spent into final arr as an object, but check if the selected_category is equal to default category
    if (Array.isArray(selectedCatArr) && selectedCatArr.length > 0) {

      selectedCatArr.map((spendingObj) => {

        if(spendingObj.selected_category === defaultCategory.category) {
          const store_name = spendingObj.store_name
        const amount_spent = spendingObj.amount_spent

        let storeName = store_name

        if (store_name.length > 7) {
          storeName = store_name[0] + store_name[1] + store_name[2] + store_name[3] + store_name[4] + store_name[5] + store_name[6] + '...'
        }

        finalArr.push({storeName, amount_spent})
        }
      })
    }

    //final render of all obj placed in finalArr
    if (Array.isArray(finalArr) && finalArr.length > 0) {
      
      return finalArr.map((obj, index) => {
        
        return (
          <div className='manage--card--spending' key={index}>
            <div>
              {obj.storeName}
            </div>
            <div>
              {'$'}{obj.amount_spent}
            </div>
          </div>
        )
      })
    }
  }

  const renderSpendingForSelectedCat = (arrayOfObjs) => {
      
    if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {
        
      return arrayOfObjs.map((spendingObj, index) => {
        
        if(propsCategory === spendingObj.selected_category) {

          const store_name = spendingObj.store_name
          const amount_spent = spendingObj.amount_spent

          let storeName = store_name
          if (store_name.length > 7) {
            storeName = store_name[0] + store_name[1] + store_name[2] + store_name[3] + store_name[4] + store_name[5] + store_name[6] + '...'
          }

          return (
            <div className='manage--card--spending' key={index}>
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
            {renderSumForDefaultCat(spending.for_default_category, spending.for_selected_categories)}
            {renderBudget(categories, propsCategory)}
            {renderSpendingForDefaultCat(spending.for_default_category, spending.for_selected_categories)}
          </>
        )
      }
    }

    //check that if the card being rendered is not the default card
    if (propsCategory !== defaultCategory.category) {


      if (spending.for_selected_categories) {
        // console.log(propsCategory)
        // console.log(spending.for_selected_categories)
        return (
          <>
            {renderSumForSelectedCat(spending.for_selected_categories)}
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

        const round = sum.toFixed(2)

        return round
      }
    }

    //check that if the card being rendered is the default card. If yes, append
    if (propsCategory === defaultCategory.category) {
      let sumVals = 0.00

      //This checks if spending.for_default_category exists and is an array
      if (spending.for_default_category && spending.for_default_category.length > 0) {
        sumVals += Number(sum(spending.for_default_category))
      }

      //This checks if spending.for_selected_categories exists and is an array
      if (Array.isArray(spending.for_selected_categories) && spending.for_selected_categories.length > 0) {

        spending.for_selected_categories.map((obj) => {
          if(obj.selected_category === defaultCategory.category){
            sumVals += Number(obj.amount_spent)
          }
        })

      }

      
      return sumVals.toFixed(2)
    }

    //check that if the card being rendered is not the default card
    if (propsCategory !== defaultCategory.category) {


      if (Array.isArray(spending.for_selected_categories) && spending.for_selected_categories.length > 0) {

        let sumVals = 0.00

        spending.for_selected_categories.map((obj) => {

          if (propsCategory === obj.selected_category) {

            sumVals += Number(obj.amount_spent)
          }
        })

        return sumVals.toFixed(2)
      } else{return Number(0).toFixed(2)}


    }
  }

  const accessDynamicSpendingArrOfObj = () => {

    const returnSpendingForDefaultCat = (defaultCatArr, selectedCatArr) => {
      let finalArr = []

      //loop though defaultCatArr, place store_name and amount_spent into final arr as an object
      if (Array.isArray(defaultCatArr) && defaultCatArr.length > 0) {

        defaultCatArr.map((obj) => {
          finalArr.push(obj)
        })
      }

      //loop though selectedCatArr, place store_name and amount_spent into final arr as an object, but check if the selected_category is equal to default category
      if (Array.isArray(selectedCatArr) && selectedCatArr.length > 0) {

        selectedCatArr.map((obj) => {
          
          if(obj.selected_category === defaultCategory.category) {
          finalArr.push(obj)
          }
        })
      }

      //final render of all obj placed in finalArr
      if (Array.isArray(finalArr) && finalArr.length > 0) {

        return finalArr.map((obj) => {
          return obj
        })
      }

      if(finalArr.length === 0){
        return [undefined]
      }
    }

    const returnSpendingForSelectedCat = (arrayOfObjs) => {
      
      if (Array.isArray(arrayOfObjs) && arrayOfObjs.length > 0) {
          
        return arrayOfObjs.map((obj) => {
          if (propsCategory === obj.selected_category) {
            return obj
          }
        })
      } else {return [undefined]}
      
    }

    const dynamicSpendingArrOfObj = () => {

      if (propsCategory === defaultCategory.category) {
        if (spending.for_default_category) {

            return returnSpendingForDefaultCat(spending.for_default_category, spending.for_selected_categories)
          
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
    renderBudget,
    renderForCardPrev,
    spendingSum,
    accessDynamicSpendingArrOfObj,
  }
  return finalObj
}

export default categoryInfo