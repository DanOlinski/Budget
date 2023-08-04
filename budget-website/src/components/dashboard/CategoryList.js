import { React, useState, useEffect } from "react";
import useDashboardData from "./hooks/selectors";
import { PieChart } from '@mui/x-charts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, startOfMonth } from 'date-fns'
import '../styles/dashboard.scss'


export default function CategoryList(props) {
  const { spendingState, spendingByDates } = useDashboardData();

  const { categories } = spendingState;

  

  const pieChartData = {
    data: categories.map((category) => ({
      id: category.id,  // Assign a unique id based on the key of the CategoryListItem
      value: category.budget,  // Use the 'budget' prop from CategoryListItem
      label: category.category,    // Use the 'name' prop from CategoryListItem as the label
    })),
    innerRadius: 50,
    outerRadius: 150,
    paddingAngle: 5,
    cornerRadius: 5,
    startAngle: -90,
    endAngle: 360,
    cx: 200,
    cy: 200,
  };

  // const currentDate = Date.parse(new Date());
  // console.log(currentDate);
  const currentDate = new Date()
  console.log(currentDate);

  const firstDayMonth = startOfMonth(currentDate);

  // need to find a way to input currentDate and first day of the month
  const [startDate, setStartDate] = useState(firstDayMonth);
  const [endDate, setEndDate] = useState(currentDate);

  useEffect(() => {
    spendingByDates(startDate, endDate);
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    spendingByDates(startDate, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    spendingByDates(startDate, endDate);
  };

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
    <PieChart
    colors={['#566f73', '#655673', '#567358', '#736e56']}
        series={[
          pieChartData,  // Use the transformed pie chart data
        ]}
        width={600}
        height={600}
      />
      </div>
  </div>
  );
}
