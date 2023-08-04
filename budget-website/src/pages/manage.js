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
  useManageApp(userId)
  //-----v-visited stores-v-----
  const { defaultCategory, categories, visitedStores, selectedCategory } = useGlobalStates()


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
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //-----^-dialog box-^-----

  //-----v-card-v-----
  const renderCard = () => {
    const textForTittle = 'INSTITUTIONS'
    return (
      <>
        <div onClick={handleClickOpen('paper')}>
          <Card
            tittle={textForTittle}
            renderStores={true}
            renderStoreComponent={renderStore('Render For Card')}
          />
        </div>
        <DialogBox
          tittle={textForTittle}
          open={open}//handles opening dialog box
          onClose={handleClose}
          scroll={scroll}
        />
      </>
    )
  }
  //-----^-card-^-----

  //-----v-update db-v-----
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

  //-----^-categories-^-----

  //-----v-update db-v-----
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
    token: 'EwCQA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAX91R0X8177aq3rS7e66/nmiuWrSGzOfnxL8EogUTQikiLK+1GK5s0qR+jkuJDgUukk4V4jCSznthv2N1YNc+qjur1LxqjmpWbwwltXLTdX34msalQ9oWiICZI/w4filqyyTX9Ar6MS3SOMv9sEPjbTiz81HAUXAenxvPHUIVyycPzfaVskh0LsO/U2NiLsllHupwP6sfu6w7mdcXFr2VeG46wdPDDSQA4OTySVOd3ZeaLyvIpgh03vd/Ja/mY3vLNsVhEUSjD0YD7vJ3VcDWAZ/Ns68zle3sIP48FwtKO52J54xFoBVT+WoDby+JTpgw9ioj4ma2gQc78qaCxKvHIwDZgAACM6tFuA6fKH2YAJkysNReSQXbCX390ytBIYHGYdWfI1HhNGmFs+bHSe0FIEgT1WNolD111SSpcQJlqy9D0R2PqsbC7qYeCOp3c2qszPE5DUPl2Qhl27oKtkUwxJ7wl6WOukF7k7iPnBDAueEdoP593Vc/nXv+7p6lc2mh2A6YyIoX7TolhdROjNClVO7FaUpRd4NQDNWnqEPW+RwYD/4mQ7cn5e1lpw1HmGiw2DBRlH/QdOCfNYBeZ+BnnuL8vnepqYbL0UvVUT/3K7bl7vZBt27dEIr3Mo+qMluspf7LMNN7DZpiDEosIyeEqwqqI4XVJt74uh/DgrKJfqbgyOe/+uUD84aIca+oHxE4sgDSBXdpT/nCApZT23rQumY6rywny5lQkeR9UIC/m9PMiHxkYYnbSagi4h8nC2j3BoU63SHbZbU4S73QOZ3/zSeQA/545F7WwIl+xLh9CVqdfQoLJBwRcB9eVI9U0XmZIa/agSq05dmD0+TsheBdbpjan5tLvr+qzvw4Mkbp9NcBvNUrP4kGPg5RykCtZydG9LSkZvkFJlY3eLL8QPmHBEWuarTm0M9eNtAfU3XPh43FOEWk08WQWYDPaQRuf1I3VLI85x0HpK9wn2OyQbTDPx7RTuPQm6UeWSgGevQzyCSOPimt3t81QUptqzvi9C93SIyfeAYgVnavqk/pAmGfzxpbOR2ytQ4rmDa/6ky1HJl/fy5F6H+zw6IG1ubMiJamtIErlJ7rcnkwb7zM602Xly0E98S8Gvugg96rK4MoOrxWmg2LZkZFVCn+wdJ6cbSS/SjX4v0DQXf5zYz3nSxYKgC'
  }

  console.log(userId)
  //run this 1st
  // React.useEffect(() => {
  //   axios.put('/inserts/new_account',
  //     {
  //       user_id: userId,
  //       bank: 'Scotiabank',
  //       token: authentication.token,
  //       folder_url: 'https://graph.microsoft.com/v1.0/users/final.project.lhl@outlook.com/mailFolders/AQMkADAwATMwMAItNjJkOC0xMzJiLTAwAi0wMAoALgAAAy3KWEvbj4tIvxN9uTIgazUBAMVxau0anYpLoRd2HmPfL1sAAAAEH75WAAAA',
  //     })
  //     .then((resp) => {
  //       console.log(resp.data)
  //     })
  // }, []);
  
  
  //run this 2nd
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
  //       console.log(resp.data)
  //     })
  // }, []);

  //-----^-debug states-^-----


  return (
    <div className='manage'>

      {renderCard()}
      <Card addCategory={true} />

    </div>
  );
}
