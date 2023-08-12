import { React, useState, useEffect } from "react";
import useDashboardData from "./hooks/selectors";
import { PieChart } from '@mui/x-charts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startOfMonth } from 'date-fns'
import '../styles/dashboard.scss'
import useGlobalStates from "../../hooks/useGlobalStates";
import useManageApp from "../../hooks/useManageApp";


export default function CategoryList(props) {
  const { spendingState, spendingByDates } = useDashboardData();
  const { rangeDates, setRangeDates, emailsDownloaded } = useGlobalStates()

  const { spendingTotal } = spendingState;

  const currentDate = new Date()

  const firstDayMonth = startOfMonth(currentDate);

  // need to find a way to input currentDate and first day of the month
  const [startDate, setStartDate] = useState(firstDayMonth);
  const [endDate, setEndDate] = useState(currentDate);

  useEffect(() => {
    console.log("useEffect ran!");
    const storedStartDate = localStorage.getItem('selectedStartDate');
    const storedEndDate = localStorage.getItem('selectedEndDate');
  
    if (storedStartDate) {
      setStartDate(new Date(storedStartDate));
    } else {
      setStartDate(firstDayMonth);
    }
  
    if (storedEndDate) {
      setEndDate(new Date(storedEndDate));
    } else {
      setEndDate(currentDate);
    }
  


    
    
   
    
    setTimeout(()=> {
      spendingByDates(storedStartDate || firstDayMonth, storedEndDate || currentDate)
      }, 3000)


  }, [emailsDownloaded]);


  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log("this is the start date set now", date)
    setEndDate(prevEndDate => prevEndDate);
    spendingByDates(date, endDate);
    localStorage.setItem('selectedStartDate', date.toISOString());
  };

  const handleEndDateChange = (date) => {
    setStartDate(prevStartDate => prevStartDate);
    setEndDate(date);
    spendingByDates(startDate, date);
    localStorage.setItem('selectedEndDate', date.toISOString());
  };

  
  //--v--extracting range dates to be used in manage route
  
  useEffect(() => {
    const convertDateToISO = (date) => {
      let dateFunc = new Date(date)
      return dateFunc.toISOString()
    }

    const obj = {
      start_date: convertDateToISO(startDate), 
      end_date: convertDateToISO(endDate)
    }

    setRangeDates(obj)
    
  }, [startDate, endDate]);

    useManageApp()

  //--^--extracting range dates to be used in manage route

  return (
    <div className='categories-container'>
      <div className='date-picker'>
     
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <span className='picker1'>
      <DatePicker
        label="Select Date and Time"
        value={startDate}
        onChange={handleStartDateChange}
      />
      </span>
      <span className='picker2'>
      <DatePicker
        label="Select Date and Time"
        value={endDate}
        onChange={handleEndDateChange}
      />
      </span>
    </LocalizationProvider>
    
    </div>
    <div className='pie-chart'>
    {spendingTotal !== null && Object.keys(spendingTotal).length > 0 ? (
          <PieChart
            colors={['#566f73', '#655673', '#567358', '#736e56', ]}
            series={[
              {
                data: Object.keys(spendingTotal).map((category) => ({
                  key: category,
                  id: category,
                  value: spendingTotal[category],
                  label: category 
                })),
                innerRadius: 50,
                outerRadius: 180,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 360,
                cx: 200,
                cy: 200,
              },
            ]}
            width={600}
            height={500}
  labelStyle={{
    fontSize: 8, // Adjust the font size
    fill: 'black', // Text color
    stroke: '1px', // No border
  }}
          />
        ) : (
          <p>No spending data available for this timeframe.</p>
        )}
      </div>
  </div>
  );
}
