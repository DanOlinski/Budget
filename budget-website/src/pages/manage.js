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

  // const authentication = {
  //   token: 'EwCIA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAafgrD6vy4qVtJuIPSMqQNHZKaxJU0AaQ4ZVZbBlympc0CvZTV3Yf3m0fog1vDxmqaB4fOkEbUp0nRW0G1WE2CjPxxN4xFQioWF+2ks7nMMpjshNN9BuvavmiJQinOBOP8VVGhS+3q+EdPaaCsSMueIAuWYKmkTgUfuiahlIH9RR0dpxkb5oFQ/7Fhr0vBd3m9tjN4KeIu5SZYBG3u1enrGN9vZA9pafHIMw2Kx38Or/AB4rYrauTlbH3pbZLDj9IwuCQrNet/k/+Yg7Dc1nAyhCPSQ1yfA0Fz0WYYVj947lYRkmBsJetUgv9PDM4fkSBw0qXC1ZAI0MNYhe9eOmAJsDZgAACKW57ta/gaUfWAIDA6EYMl0wf8JU7IuLP0acin+rM5BupbUH48L7L30ABFv2vfr8KVFCp4wgKUEyLVnA6Q2hXRAFbZBBAJn50yoJ1/q2Leuwb60tibz+KIJd9qkRUs8CKAekUWZaTL5LB9SSzOUS7nxit6IdMBvzNhgz75jgoBBIdWjQWAhzP7mFtHRgztPdJQGWE4LJKbdyysI1dDaUAO3SR5EyxHsaH4uwc3NsIhpuiypVTnzCOahOLtj6AZ86jF4xQ8wAwPSHCgP8XIJcF9UhBwdcDqlTT27GO9yI7rrPz6EQT21VEAS4J4eD+/AKRJvVO5foBdhcVyJ2d3uiLxmIFhzOzeeHIs+JMrNZ78FU8+0QO0u8mtdpxaL/n+ZVrBC7bPuYGhaQpO6o+78L2qfb2UayB9nu+4i7YBjr6Cf1Xwkrxx9HSJMwSExK+qyWIybj2x9UzrvWVxm59+50JRq8kHmuI8QcnMPUGUCon/5MV5A/tdS6u/E3SEv7be22ExQ/SNJPI0unWP2ss19rQ+1A9GTj26glRH7nKxHoB8CYmxvnspKZQwjUZ0StZJGvMazxzjNM+uTXL6BCVk1FPvQMs3S6s4FSDJP/ICrfEeS64IOPLDwqXp8hgMpo/TMddZZyocs+TrPrnuU08pY2mwJz3x9CrlX3dRhXtLC1BhDhWxeypBKKXYezLbzXwEozrM6MXPteChrfjWdpveEg2OxNiyOK5glmoV72TwmCw+K4uCxEpUeTBskVVmu7VaazlVeplW50LjGUWbCM6Ux4Js/VXWHtPbvn32r0NAVJjK2Eh6WoAg=='
  // }

  // // run this 1st
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
  
  
  // // //run this 2nd
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
