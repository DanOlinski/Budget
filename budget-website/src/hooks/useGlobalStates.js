//this method of creating global state to access from any file id BRILIANT, you can find the documentation(very straight forward) in here; https://docs.pmnd.rs/zustand/getting-started/introduction (managing global states)

import { create } from 'zustand'

//for this to work you have to run a custom Hook (for example: useManageApp) 
//the hook will then download info from the db, save that info in the global states.
//You can also use this object to make any set of info to ba accessible globally
const useGlobalStates = create((set) => ({
  //here the defaultCategory is set to an empty array, since in this app all data coming from db is an array, if the data type is set to something different the app breaks. 
  defaultCategory: ['Default'],
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

  selectedCategory: {},
  setSelectedCategory: (newData) => set(() => ({selectedCategory: newData})),

  userId: localStorage.getItem('auth')
  
}))

export default useGlobalStates

