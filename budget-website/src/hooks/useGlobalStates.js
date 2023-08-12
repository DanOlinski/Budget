//this method of creating global state to access from any file id BRILIANT, you can find the documentation(very straight forward) in here; https://docs.pmnd.rs/zustand/getting-started/introduction (managing global states)

import { create } from 'zustand'

//for this to work you have to run a custom Hook (for example: useManageApp) 
//the hook will then download info from the db, save that info in the global states.
//You can also use this object to make any set of info to ba accessible globally
const useGlobalStates = create((set) => ({
  //here the defaultCategory is set to an empty array, since in this app all data coming from db is an array, if the data type is set to something different the app breaks. 

  defaultCategory: {category: '-Default-', budget: null},
  setDefaultCategory: (newData) => set(() => ({defaultCategory: newData})),

  categories: [],
  setCategories: (newData) => {
    //set is a function that returns an object. insert a a single key&value pair, where the value is an array(incoming from db), the key name HAS to be the same as the state(in this case: categories)
    set(
      () => ( { categories: newData } )
    )
  },

  visitedStores: [],
  setVisitedStores: (newData) => set(() => ({visitedStores: newData})),

  //holds the value for what category is set to a store. This value is used to tell react the relation of store and in what category that store should be placed
  //this object will contain one key/value pair for each store
  //{store_name: selected_category}
  selectedCategory: {},
  setSelectedCategory: (newData) => set(() => ({selectedCategory: newData})),
  
  spending: {
    for_default_category: [],
    for_selected_categories: []
  },
  setSpending: (newData) => set(() => ({spending: newData})),

  openDialogVisitedStores: false,
  setOpenDialogVisitedStores: (newData) => set(() => ({openDialogVisitedStores: newData})),
  
  openDialogCreateCategory: false,
  setOpenDialogCreateCategory: (newData) => set(() => ({openDialogCreateCategory: newData})),
  
  openDialogCategoryInfo: false,
  setOpenDialogCategoryInfo: (newData) => set(() => ({openDialogCategoryInfo: newData})),

  scroll: 'paper',
  setScroll: (newData) => set(() => ({scroll: newData})),
  
  newCategory: {category: null, budget: null},
  setNewCategory: (newData) => set(() => ({newCategory: newData})),
  
  categoryToDelete: null,
  setCategoryToDelete: (newData) => set(() => ({categoryToDelete: newData})),
  
  clickedCard: {category: null, budget: null},
  setClickedCard: (newData) => set(() => ({clickedCard: newData})),
  
  updateBudget: {user_id: null, category: null, budget_limit: null},
  setUpdateBudget: (newData) => set(() => ({updateBudget: newData})),

  rangeDates: {start_date: null, end_date: null},
  setRangeDates: (newData) => set(() => ({rangeDates: newData})),

  triggerDashboardDownload: null,
  setTriggerDashboardDownload: (newData) => set(() => ({triggerDashboardDownload: newData})),

  clickedAccount: null,
  setClickedAccount: (newData) => set(() => ({clickedAccount: newData})),
  
  emailsDownloaded: null,
  setEmailsDownloaded: (newData) => set(() => ({emailsDownloaded: newData})),

  userId: localStorage.getItem('auth')
  
}))

export default useGlobalStates
