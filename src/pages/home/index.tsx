import React, { useState, useEffect } from 'react'
import { Employee } from '../../types'
import mockEmployees from '../../constants/mock-employee-data';
import { HomeUI } from '../../features/home';

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  
  useEffect(() => {
    setSelectedMonth(new Date());
    setEmployees(mockEmployees);
  }, []);

  return (
    <>
      <HomeUI employees={employees} selectedMonth={selectedMonth} />
    </>
  )
}

export { Home }
