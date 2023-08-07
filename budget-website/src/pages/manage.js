import * as React from 'react';
import Card from '../components/manage/card';
import '../components/styles/manage.scss';
import useManageApp from '../hooks/useManageApp'
import VisitedStores from '../components/manage/visitedStores';
import DialogBox from '../components/manage/dialogBox'
import axios from "axios";
import useGlobalStates from '../hooks/useGlobalStates';
const userId = localStorage.getItem('auth')

export default function Manage(props) {
  const { defaultCategory, categories, visitedStores, selectedCategory, openDialogVisitedStores, setOpenDialogCreateCategory, setOpenDialogVisitedStores, scroll, setScroll, spending, newCategory, openDialogCategoryInfo, setOpenDialogCategoryInfo, setCategories, setNewCategory, categoryToDelete, setCategoryToDelete, updateBudget, rangeDates } = useGlobalStates()

  // console.log(spending)
  // console.log(categories)


  //-----v-visited stores-v-----
  const renderStore = (forWhatComponent) => {
    return visitedStores.map((store, index) => {

      return (
        <>
          <VisitedStores
            id={index}
            renderFor={forWhatComponent}
            store_name={store.store_name}
          //tittle={'INSTITUTIONS'}//don't need this for rendering a card
          //selected_category={store.selected_category}
          />
        </>
      )
    })
  }
  //-----v-visited stores-v-----

  //-----v-dialog box-v-----

  const handleClose = () => {
    setOpenDialogVisitedStores(false);
    setOpenDialogCreateCategory(false);
    setOpenDialogCategoryInfo(false)
  };
  //-----^-dialog box-^-----

  //-----v-card-v-----
  const storesCardTittle = 'Institutions'
  const renderStoresCard = () => {
    return (
      <>
        <Card
          tittle={'Institutions'}
          renderStores={true}
          renderStoreComponent={renderStore('Render For Card')}
        />
      </>
    )
  }

  const renderCategoriesCards = () => {
    return categories.map((category) => {
      if (category.category !== defaultCategory.category) {
        return (
          <>
            <Card
              budget={category.budget}
              renderCategory={true}
              category={category.category}
              renderStoreComponent={renderStore('Render For Card')}
            />
          </>
        )
      }
    })
  }
// console.log(defaultCategory)
  const renderDefaultCategory = () => {
    if(defaultCategory.category !== '-Default-'){
    return (
      <>
        <Card
          budget={defaultCategory.budget}
          renderCategory={true}
          category={defaultCategory.category}
          renderStoreComponent={renderStore('Render For Card')}
        />
      </>
    )
    }
  }

  
  //-----^-card-^-----

  //-----^-update db-^-----
  //update default category when state defaultCategory changes
  React.useEffect(() => {
    if(defaultCategory.category !== '-Default-'){
      axios.put(
        `/inserts/set_default_category`,
        {
          user_id: userId,
          category: defaultCategory.category,
          start_date: `${rangeDates.start_date}`,//'2021-01-01T00:00:00Z',
          end_date: `${rangeDates.end_date}`//'2023-08-01T00:00:00Z'
        }
      )
    }
  }, [defaultCategory]);

  React.useEffect(() => {
    if(categoryToDelete !== null && categoryToDelete !== defaultCategory.category){
      axios.put(
        `/delete/category`,
        {
          user_id: userId,
          category: categoryToDelete,
        }
      )
    }
  }, [categoryToDelete]);
  
    React.useEffect(() => {

      if(newCategory.category && newCategory.budget){
        axios.put(
          `/inserts/new_category`,
          {user_id: userId, category: newCategory.category, budget_limit: newCategory.budget}
        )
      }
    
  }, [newCategory]);

  React.useEffect(() => {
    if(updateBudget.user_id && updateBudget.category && updateBudget.budget_limit){
      axios.put(
        `/inserts/set_budget_limit`,
        updateBudget
      )
    }
  }, [updateBudget]);

  //-----^-update db-^-----

  //-----v-debug-v-----
  // const state = categories
  // React.useEffect(() => {
  // console.log(categories)
  // state.map((i) => {
  // console.log(category)
  //   if(i.is_default){
  //   }
  // })
  // console.log(state)
  // },[state]);

  //------download emails-----

  //place updated token
  //login
  //go to manage tab
  //refresh browser 2 times
  const authentication = {
    token: 'EwCIA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAeqXJ/lDa2XFgGTug8hQI6S51Ejv3mOnCoZy4FBG83ITj8W/tVmvq8xqqff371atd0OZkZhsGZxYGh3yWDsgbVMnTJ4/HVK+9RGGz2l2RAUs5c5bu7UcJTMHuRmmUxebegWppP2NiyyrTxVPnaS1P6K+68vcjZV5/ndY99dZSu/MwirwxVveKNwHgVR/g8eEzttPEjRZ1p5RMO4EC9Ps3Oi519bbMe3+PS5Y2gTgElA8rFdTVotMHb09ZsWIspvYQtRXlLiTEyBlLy+y7Ymbf0Gla7wx/AD3Zl7s7jCC25HMuKKuU6Tl5C22BN8Gcfx8nUWTCOkS5jzNXnEEVjjtJokDZgAACBFnbu6M4JlyWAIlCsDd6LiOpBZrd+utN0R7vS7Ad3gvqfotsf+Z57EhSq5wF3wrGw39UdxoppC2aUtrRdQBOV2Ffk9hoiuz6gefOuAFJbIzECYDVMyT0/8GKBZ11RZU9wDsoEVUaVSkEtLnCIWJjhqDJwNe2nT4JQ5LDAqH9AgS33osHvT0/gUTLn7TtxJa2yEVJZWG1zuY2LPoDpnTW50OT0N7grCvLViHd+aIzdn6lXdud5HXpAvTz9oFE7aFwrh82puw8DWyUbMLwBr0mdFpYPxEoWh0gtYy9Fh8dd3R+HZTADoB1Pj0bDGO6X5JdGPCBGh3tsngWDAKmnMvROdrodSsGea5t7l/onl/LKnk1inSrxxQSGzRpCqQQ9M9zhnwPMH33S7FuOkwGZgR0cBkBu59cpEmdqgggqjzprRZuLTBtmDKBCgXLx61bspVEfcZ4jDP7zLf9e4RAttq2ZWDNWxC38RoviCKbX1s8hthN43/60Wwko0q3nzUOpZKk7hxreV1/XU/T2wsCdAdUt8DJoIwgEDY66WPfJ2DcNl1dSS3o1K16ac1zLoC71AbvNBHoc4xRiwsCOmKx1VIpHvIbVlkaT7qUwmyvVmwX2+Msi3Nhl4mtN3vcOjewO1H/QPs0Tk0y/HefMIG0rZ/VTDxOy8P4cvZewBJkDydqo5myDslt14kdxe8ewTS+Jf8tBnd8mfzlU8hrywappmVKaaCnqCWuyRP0XysiOX+fAWdiBi1KxEw4n1DusE3jP9yea3yjkjjlaIGQbrwB3jDZ0plL41CDLnxu1aFgT78JAxgSCioAg=='
  }

  // React.useEffect(() => {
  //   axios.put('/inserts/new_account',
  //     {
  //       user_id: userId,
  //       bank: 'Scotiabank',
  //       token: authentication.token,
  //       folder_url: 'https://graph.microsoft.com/v1.0/users/final.project.lhl@outlook.com/mailFolders/AQMkADAwATMwMAItNjJkOC0xMzJiLTAwAi0wMAoALgAAAy3KWEvbj4tIvxN9uTIgazUBAMVxau0anYpLoRd2HmPfL1sAAAAEH75WAAAA',
  //     })
  //     .then((resp) => {
  //       // console.log(resp.data)
  //     })
  // }, []);

  // React.useEffect(() => {
  //   //https//developer.microsoft.com/en-us/graph/graph-explorer
  //   axios.put('/inserts/download_emails',
  //     {
  //       user_id: userId,
  //       token: authentication.token,
  //       bank: 'Scotiabank',
  //       start_date: '2020-10-01T00:00:00Z',
  //       end_date: '2023-08-01T00:00:00Z'
  //     })
  //     .then((resp) => {
  //       // console.log(resp.data)
  //     })
  // }, []);

  //-----^-debug-^-----

  // useManageApp(userId)
  return (
    <div className='manage'>

      {renderStoresCard()} 

      {renderDefaultCategory()}
      {renderCategoriesCards()}

      <Card addCategory={true} />

      <DialogBox
        tittle={storesCardTittle}
        onClose={handleClose}
        scroll={scroll}
      />

    </div>
  );
}
