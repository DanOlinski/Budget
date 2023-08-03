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
  })}
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
  },[defaultCategory]);

  //-----^-categories-^-----
  
  //-----v-update db-v-----
  const state = categories
  React.useEffect(() => {
    
    // console.log(categories)
    // state.map((i) => {
      // console.log(category)
    //   if(i.is_default){
    //   }
    // })

    // console.log(state)
  },[state]);
  //-----^-debug states-^-----
  

  return (
    <div className='manage'>

      {renderCard()}
      <Card addCategory={true}/>

    </div>
  );
}
