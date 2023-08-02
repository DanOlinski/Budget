import { React, useState } from "react";
import useDashboardData from "./helpers/selectors";
import { PieChart } from '@mui/x-charts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, startOfMonth } from 'date-fns'
import '../styles/dashboard.scss'


export default function CategoryList(props) {
  const { categories } = useDashboardData();

  const pieChartData = {
    data: categories.map((category) => ({
      id: category.id,  // Assign a unique id based on the key of the CategoryListItem
      value: category.budget,  // Use the 'budget' prop from CategoryListItem
      label: category.category,    // Use the 'name' prop from CategoryListItem as the label
    })),
    innerRadius: 20,
    outerRadius: 100,
    paddingAngle: 5,
    cornerRadius: 5,
    startAngle: -90,
    endAngle: 180,
    cx: 100,
    cy: 100,
  };

  // const currentDate = Date.parse(new Date());
  // console.log(currentDate);
  const currentDate = new Date();

  // const firstDayMonth = startOfMonth(currentDate);

  // need to find a way to input currentDate and first day of the month
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className='categories-container'>
      <div className='date-picker'>
     
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        width={400}
        height={500}
      />
      </div>
  </div>
  );
}
