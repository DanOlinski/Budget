import axios from "axios";
import { useState, useEffect } from "react";
//importing the global state
import useGlobalStates from "./useGlobalStates";
import { startOfMonth } from "date-fns";
import useDashboardData from "../components/dashboard/hooks/selectors";


//this function is triggered(in the 1st page(App.js)) to download all the info from the db then set that info to the global states available, these states are coded in the useGlobalStates file.
const useManageApp = () => {

  const {
    spendingState
  } = useDashboardData();

  const userId = localStorage.getItem('auth');

  //here I am setting "setDefaultCategory"(global state) to a variable so that I can change these states from an empty array to info from database
  const { 
    setDefaultCategory, 
    setCategories, 
    setVisitedStores,
    setSelectedCategory,
    setSpending,
    rangeDates,
    setRangeDates
  } = useGlobalStates()

  //------V---------dates
  
  if(!rangeDates.start_date || !rangeDates.end_date){
    const currentDate = new Date()
    const firstDayMonth = startOfMonth(currentDate);
    const convertDateToISO = (date) => {
      let dateFunc = new Date(date)
      return dateFunc.toISOString()
    }

    const defaultDatesObj = {
    start_date: convertDateToISO(firstDayMonth),
    end_date: convertDateToISO(currentDate)
  }

  setRangeDates(defaultDatesObj)
  }

  //------^---------dates


  useEffect(() => {

    Promise.all([
      axios.get(`/getters/stores_by_user_id/${userId}`),
      axios.get(`/getters/categories/${userId}`),
      axios.get(`/getters/defaultCategory/${userId}`),
      axios.post('/getters/spending', 
        {
          user_id: userId, 
          start_date: `${rangeDates.start_date}`,//'2020-10-01T00:00:00Z',
          end_date: `${rangeDates.end_date}`,//'2023-08-01T00:00:00Z'
        })
      
    ])
    .then((all) => {
      const strs = all[0].data
      const cats = all[1].data
      const defaultCat = all[2].data
      const spending = all[3].data
      
      const spendingObj = {
        for_default_category: [],
        for_selected_categories: []
      }
      if(spending.for_default_category && spending.for_default_category !== 'not found'){
        spendingObj.for_default_category = spending.for_default_category
      }
      if(spending.for_selected_categories && spending.for_selected_categories !== 'not found'){
        spendingObj.for_selected_categories = spending.for_selected_categories
      }
      setSpending(spendingObj)
      
      if(Array.isArray(cats)){
        setCategories(cats)

        //this code is getting the default category from category state, but it is looping, the there is already an API request to handle this, below
        // cats.map((categoryObj) => {
        //   if(categoryObj.is_default){
        //     //here I am updating the value for the default category to the value coming from the database
        //     setDefaultCategory(categoryObj.category)
        //   } 
        // })
      }
      
      if(Array.isArray(strs)){
        setVisitedStores(strs)
        const selectedCategoryObj = {}
        strs.map((storeObj) => {
          selectedCategoryObj[storeObj.store_name] = storeObj.selected_category
        })
        setSelectedCategory(selectedCategoryObj)
      }

      if(defaultCat && defaultCat[0].category !== 'not found'){
        setDefaultCategory({category: defaultCat[0].category, budget: defaultCat[0].budget})
      }

    })
    .catch((e) => console.log(e.message))
  },[rangeDates, spendingState]) 


  // console.log(rangeDates.start_date, '#########')
  // console.log(rangeDates.end_date, '#########')

  return 'db downloader'
}

export default useManageApp;
