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
   const { defaultCategory, categories, visitedStores, selectedCategory, openDialogVisitedStores, setOpenDialogCreateCategory, setOpenDialogVisitedStores, scroll, setScroll, spending } = useGlobalStates()
  useManageApp(userId)

  // console.log(spending)

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
  };
  //-----^-dialog box-^-----

  //-----v-card-v-----
  const textForTittle = 'INSTITUTIONS'
  const renderStoresCard = () => {
    return (
      <>
          <Card
            tittle={textForTittle}
            renderStores={true}
            renderStoreComponent={renderStore('Render For Card')}
          />
      </>
    )
  }

  const renderCategoriesCards = () => {
    return categories.map((category)=>{
      return (
        <>
            <Card
              renderCategory={true}
              category={category.category}
              renderStoreComponent={renderStore('Render For Card')}
            />
        </>
      )
    })
  }
  //-----^-card-^-----

  //-----^-update db-^-----
  //update default category when state defaultCategory changes
  React.useEffect(() => {
    axios.put(
      `/inserts/set_default_category`,
      {
        user_id: userId,
        category: defaultCategory,
        start_date: '2021-01-01T00:00:00Z',
        end_date: '2023-08-01T00:00:00Z'
      }
    )
  }, [defaultCategory]);

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

  const authentication = {
    token: 'EwCIA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAf80LozgdApXw/6aKrlGuuXWmHGk45JS83cML6A2N6Xas+d69qe4lVi3saMxN5H09jxONo6mLPXK/vLttJ/mY7qAyqjeiayo1PIEKLyZRk5YwBiU5GvHApQLSTgQ31RDE2soOq31WjE6pMs0oA/ghA+TVIDS9wiA6VRAepahXjPA8QpQc34Mskj3P/7G4tOXfrsvIjxmWacJSVvl6/F/hSmgEj5XjlQgJ3FpVXaAnkxT2KuXjt/XipDGeGn69TKKLe6jhotUA2moFdy5HGEEXMOaZjfNYdKvlqnkzNKTy/v4eyaKapvIJ55LnewTjOBcVMnw1YBjPyAKZyzRgkcSwpUDZgAACEQcYVvB9E2wWAIOIAWTvBZ13Qw61coIPuM4On6X3bT2ituuXau6d2rwY4dHkxYU4u/WH6VepoDkyN39KYUoooENsvPMow1ZX4kI0t/JJ5s49mDRqmU4zUEw1swJSN+QOSwNroD3AHiViBRJcXe/8TkweSbt9BgubZI6kmy+P+lC+NLYEW5XCClTZUq+ZmIopgnTsFIi4ddikdX96eXug3pEQDQ/x2ijPJrqjlOHikSkBkDHiRm0kWvzCXmWtAXyVmfVhb7YlMOxUD7nPXgLtM1spZU03aJVoD0v8GZ1GEqoMhYUsfKCFDJ2NaeL+nMHCq9yF7l7br/cgA3+YdIa9SF9bsTL5kpeNgY1/h/cA6MqwWSo7Xhir/2fDvz+CNbgd1kBZqhSUmYEIXzO8xXLayFv1MPY7qrqXF9/PDPUHhi35oOWU/x+yvFiu715Dy210/kDGUNklhzCvBCSptUC3qZXf48y+X61jN7cc957fYNxJqlB/GXaPlv2sL1FN4VCcWVR6yAszRG0P5jklXnJW1y45gs4uqRyv1sV3K2Yxvcd70slJvn6qll5ToNigVdKzfte3z2Nmc5FwjvHeGbsUeC+7oV45LMTOWQP+wCfMRWTqisChQcVFUMgdCvtoX8XtuiZCnlIfmLru6Gp7yCG/NS+h8Bq2Ef2edF8zBd1iE7F+dos0R+tuswgUaC3lxGM8OYOGBzKHouuqPR963nPG024TkU3weNktbOFIb/lzNYleHyCg26sTvmigL0gtcQuR9EMPOXRfLL2qcwzT93P2YGm0YjBITsUuFNDYPSqUXv5t6qoAg=='
  }

  // run this 1st
  React.useEffect(() => {
    axios.put('/inserts/new_account',
      {
        user_id: userId,
        bank: 'Scotiabank',
        token: authentication.token,
        folder_url: 'https://graph.microsoft.com/v1.0/users/final.project.lhl@outlook.com/mailFolders/AQMkADAwATMwMAItNjJkOC0xMzJiLTAwAi0wMAoALgAAAy3KWEvbj4tIvxN9uTIgazUBAMVxau0anYpLoRd2HmPfL1sAAAAEH75WAAAA',
      })
      .then((resp) => {
        // console.log(resp.data)
      })
  }, []);
  
  
  // //run this 2nd
  React.useEffect(() => {
    //https//developer.microsoft.com/en-us/graph/graph-explorer
    axios.put('/inserts/download_emails',
      {
        user_id: userId,
        token: authentication.token,
        bank: 'Scotiabank',
        start_date: '2020-10-01T00:00:00Z',
        end_date: '2023-08-01T00:00:00Z'
      })
      .then((resp) => {
        // console.log(resp.data)
      })
  }, []);

  //-----^-debug-^-----


  return (
    <div className='manage'>

      {renderStoresCard()}

      {renderCategoriesCards()}

      <Card addCategory={true} />

      <DialogBox
          tittle={textForTittle}
          onClose={handleClose}
          scroll={scroll}
        />

    </div>
  );
}
