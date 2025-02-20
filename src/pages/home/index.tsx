import React, { useState, useEffect } from 'react'
import { BirthdayList, AddEmployeeForm, MiniBirthdayList } from '../../components'
import { Employee } from '../../types'
import mockEmployees from '../../constants/mock-employee-data';

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  console.log(employees);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  useEffect(() => {
    setSelectedMonth(new Date());
  }, []);
  return (
    <div className='mt-5'>
      <MiniBirthdayList employees={employees} selectedMonth={selectedMonth} />
      <header className='md:text-3xl sm:text-2xl text-xl md:font-bold font-semibold my-10'>Today's Birthdays</header> 
      <BirthdayList employees={employees} selectedMonth={selectedMonth} />
      <AddEmployeeForm onEmployeeAdded={(employee) => {
        setEmployees([...employees, employee]);
      }} />
    </div>
  )
}

export { Home }
