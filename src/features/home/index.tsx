import React from 'react'
import { BirthdayList, MiniBirthdayList } from '../../components'
import { useAuth } from '../../context/authContext';
import { Staff } from '../../types/types';

interface HomeUIProps { 
  staffs: Staff[];
  selectedMonth: Date;
}

const HomeUI: React.FC<HomeUIProps> = ({ staffs, selectedMonth }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='my-5'>
      {isAuthenticated && <MiniBirthdayList staffs={staffs} selectedMonth={selectedMonth} />}
      <header className='md:text-2xl sm:text-xl text-lg  md:font-bold font-semibold my-10'>Today's Birthdays</header> 
        <BirthdayList staffs={staffs} selectedMonth={selectedMonth} />
    </div>
  )
}

export { HomeUI }
