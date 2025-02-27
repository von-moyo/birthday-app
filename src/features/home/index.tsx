import React from 'react'
import { BirthdayList, MiniBirthdayList } from '../../components'
import { Employee } from '../../types'
import { useAuth } from '../../context/authContext';

interface HomeUIProps { 
  employees: Employee[];
  selectedMonth: Date;
}

const HomeUI: React.FC<HomeUIProps> = ({ employees, selectedMonth }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='my-5'>
      {isAuthenticated && <MiniBirthdayList employees={employees} selectedMonth={selectedMonth} />}
      <header className='md:text-3xl sm:text-2xl text-xl md:font-bold font-semibold my-10'>Today's Birthdays</header> 
      <BirthdayList employees={employees} selectedMonth={selectedMonth} />
    </div>
  )
}

export { HomeUI }
