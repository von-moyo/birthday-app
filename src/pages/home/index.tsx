import React, { useState, useEffect } from 'react'
import { BirthdayList, MiniBirthdayList } from '../../components'
import { Employee } from '../../types'
import mockEmployees from '../../constants/mock-employee-data';
import { useAuth } from '../../context/authContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  useEffect(() => {
    setSelectedMonth(new Date());
    setEmployees(mockEmployees);
  }, []);
  return (
    <div className='my-5'>
      {isAuthenticated && <MiniBirthdayList employees={employees} selectedMonth={selectedMonth} />}
      <header className='md:text-3xl sm:text-2xl text-xl md:font-bold font-semibold my-10'>Today's Birthdays</header> 
      <BirthdayList employees={employees} selectedMonth={selectedMonth} />
    </div>
  )
}

export { Home }
