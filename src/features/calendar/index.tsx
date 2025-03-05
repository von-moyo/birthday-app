import React, { useEffect, useState } from 'react'
import { Staff } from '../../types/types'
import { CalendarComponent } from '../../components/calendar'
import { format, subMonths } from 'date-fns'
import { addMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Table } from '../../components'
import { StaffBirthdayTable } from '../../components/table/components/staff-birthday'
interface CalendarUIProps {
  staffs: Staff[]
  setBirthMonth: (month: number) => void
  currentBirthMonth: number;
}

const CalendarUI: React.FC<CalendarUIProps> = ({ staffs, setBirthMonth, currentBirthMonth }) => {
  const initialDate = new Date();
  initialDate.setMonth(currentBirthMonth - 1);
  const [currentDateState, setCurrentDateState] = useState(initialDate);
  const getFormattedDate = (date: Date) => {
    return format(date, 'MMMM');
  };
  const [filteredDate, setFilteredDate] = useState(getFormattedDate(currentDateState));


  useEffect(() => {
    const newDate = new Date();
    newDate.setMonth(currentBirthMonth - 1);
    setCurrentDateState(newDate);
    setFilteredDate(getFormattedDate(newDate));
  }, [currentBirthMonth]);

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDateState, 1);
    setCurrentDateState(newDate);
    setFilteredDate(getFormattedDate(newDate));
    const newMonth = newDate.getMonth() + 1;
    setBirthMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDateState, 1);
    setCurrentDateState(newDate);
    setFilteredDate(getFormattedDate(newDate));
    const newMonth = newDate.getMonth() + 1;
    setBirthMonth(newMonth);
  };

  const shownHeaders: { index: number, title: string }[] = [
    {
      index: 0,
      title: "Name",
    },
    {
      index: 1,
      title: "Department",
    },
    {
      index: 2,
      title: "Birthday",
    },
    {
      index: 3,
      title: "Age",
    },
  ];

  const filteredBirthdays = staffs.filter((staff) => {
    try {
      const dob = new Date(staff.date_of_birth);
      return dob.getMonth() === currentDateState.getMonth();
    } catch (error) {
      return false;
    }
  });

  return (
    <div className='my-5'>
      <div className='flex justify-between items-center'>
        <header className='sm:text-2xl text-xl md:font-bold font-semibold mt-3 mb-6'>Calendar View</header>
        <div className='flex items-center md:gap-2'>
          <div onClick={handlePrevMonth} className='cursor-pointer'>
            <ChevronLeft className='text-[#5A5A5A] sm:w-5 sm:h-5 w-4 h-4' />
          </div>
          <div className='sm:text-sm text-xs text-[#5A5A5A] mx-2'>{filteredDate}</div>
          <div onClick={handleNextMonth} className='cursor-pointer'>
            <ChevronRight className='text-[#5A5A5A] sm:w-5 sm:h-5 w-4 h-4' />
          </div>
        </div>
      </div>

      <CalendarComponent month={currentBirthMonth - 1} staffs={staffs} />

      <header className='sm:text-[21px] text-xl md:font-bold font-semibold mt-6 mb-6'>Birthdays for {filteredDate}</header>

      <Table
        tableHeaderTitles={shownHeaders}
        tableBody={
          <StaffBirthdayTable
            tableBody="custom-body-class"
            tableBodyItems={filteredBirthdays}
            tableBodyItemClassName=""
            tableBodyRowClassName="grid text-xs border my-3 bg-[#FBFBFB] border-[#E7E7E7] border-opacity-50 rounded-[12px]"
            shownHeaders={shownHeaders}
          />
        }
        customTableClasses={{
          tableContainerClassName: "",
          tableHeaderClassName: "grid text-[#454242] text-sm grid-cols-[1fr_1fr_1fr_0.5fr]",
          tableHeadItemClassName: "flex items-end ",
          headerStyle: "",
        }}
      />
    </div>
  )
}

export { CalendarUI }
