import { React, useState, useEffect } from "react";
import useDashboardData from "./hooks/selectors";
import { PieChart } from '@mui/x-charts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startOfMonth } from 'date-fns'
import '../styles/dashboard.scss'


export default function CategoryList(props) {
  const { spendingState, spendingByDates } = useDashboardData();

  const { spending } = spendingState;
  console.log(spending);

  const currentDate = new Date()

  const firstDayMonth = startOfMonth(currentDate);

  // need to find a way to input currentDate and first day of the month
  const [startDate, setStartDate] = useState(firstDayMonth);
  const [endDate, setEndDate] = useState(currentDate);

  useEffect(() => {
    spendingByDates(startDate, endDate);
  },[]);

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
    {spending !== null && Object.keys(spending).length > 0 ? (
          <PieChart
            colors={['#566f73', '#655673', '#567358', '#736e56', ]}
            series={[
              {
                data: Object.keys(spending).map((category) => ({
                  id: category,
                  value: spending[category],
                  label: category
                })),
                innerRadius: 50,
                outerRadius: 150,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 360,
                cx: 200,
                cy: 200,
              },
            ]}
            width={600}
            height={600}
            label={({ dataEntry }) => `$${dataEntry.value.toFixed(2)}`} // Include the value in the label
  labelStyle={{
    fontSize: 8, // Adjust the font size
    fill: 'black', // Text color
    stroke: '1px', // No border
  }}
          />
        ) : (
          <p>No spending data available.</p>
        )}
      </div>
  </div>
  );
}
