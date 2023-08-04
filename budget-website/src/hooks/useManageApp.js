import axios from "axios";
import { useState, useEffect } from "react";
//importing the global state
import useGlobalStates from "./useGlobalStates";


//this function is triggered(in the 1st page(App.js)) to download all the info from the db then set that info to the global states available, these states are coded in the useGlobalStates file.
const useManageApp = (userId) => {

  //here I am setting "setDefaultCategory"(global state) to a variable so that I can change these states from an empty array to info from database
  const { 
    setDefaultCategory, 
    setCategories, 
    setVisitedStores,
    setSelectedCategory,
    setSpending
  } = useGlobalStates()

  useEffect(() => {

    Promise.all([
      axios.get(`/getters/stores_by_user_id/${userId}`),
      axios.get(`/getters/categories/${userId}`),
      axios.post('/getters/spending', 
        {
          user_id: userId, 
          start_date: '2020-10-01T00:00:00Z',
          end_date: '2023-08-01T00:00:00Z'
        })
    ])
    .then((all) => {
      const strs = all[0].data
      const cats = all[1].data
      const spending = all[2].data
      
      console.log(spending)
      console.log(spending.for_default_category)
      console.log(spending.for_selected_categories)

      const spendingObj = {
        for_default_category: [],
        for_selected_categories: []
      }
      if(spending.for_default_category){
        spendingObj.for_default_category = spending.for_default_category
      }
      if(spending.for_selected_categories){
        spendingObj.for_selected_categories = spending.for_selected_categories
      }
      setSpending(spendingObj)
      
      if(Array.isArray(cats)){
        setCategories(cats)
        cats.map((categoryObj) => {
          if(categoryObj.is_default){
            //here I am updating the value for the default category to the value coming from the database
            setDefaultCategory(categoryObj.category)
          } 
        })
      }
      
      if(Array.isArray(strs)){
        setVisitedStores(strs)
        const selectedCategoryObj = {}
        strs.map((storeObj) => {
          selectedCategoryObj[storeObj.store_name] = storeObj.selected_category
        })
        setSelectedCategory(selectedCategoryObj)
      }
    })
  },[]) 

  return 'db downloader'
}

export default useManageApp;
