import React, { useState, useRef } from 'react';
import { Calendar as BigCalendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Staff } from '../../types/types';
import { getInitials } from '../../utils/getInitials';
import { useClickOutside } from '../../hooks';
const localizer = momentLocalizer(moment);

interface CalendarProps {
  month: number;
  staffs: Staff[];
}

const CalendarComponent: React.FC<CalendarProps> = ({ month, staffs }) => {
  const [popUp, setPopUp] = useState(false);
  const [selectedstaff, setSelectedStaff] = useState<Staff[] | null>(null);
  const popUpRef = useRef<HTMLDivElement>(null);
  useClickOutside(popUpRef, popUpRef, () => {
    setPopUp(false)
    setSelectedStaff(null)
  }

  );

  const handleSelectDay = (slotInfo: SlotInfo) => {
    const selectedDate = moment(slotInfo.start);
    const staffWithBirthday = staffs.filter(staff => {
      const birthDate = moment(staff.date_of_birth, "YYYY-MM-DD");
      return birthDate.date() === selectedDate.date() && birthDate.month() === selectedDate.month();
    });

    if (slotInfo.bounds) {
      setSelectedStaff(staffWithBirthday);
    }
    setPopUp(true);
    setSelectedStaff(staffWithBirthday);
    console.log(staffWithBirthday);
    console.log(slotInfo.bounds);
    console.log(slotInfo.start);
  };

  const defaultDate = moment().month(month ?? new Date().getMonth()).toDate();
  const CustomDateHeader = ({ label, date }: any) => {
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    const staffWithBirthday = staffs.filter((staff) => {
      const birthDate = moment(staff.date_of_birth, "YYYY-MM-DD");
      return birthDate.date() === date.getDate() && birthDate.month() === date.getMonth();
    });
    const monthTextSize = window.innerWidth < 500 && 'text-xs';
    const smallTextSize = window.innerWidth < 500 && 'text-[10px]';
    return (
      <div className={`flex flex-col text-[0.9rem] text-left`}>
        <span className={`sm:ml-[10px] sm:mt-[10px] mt-[5px] ml-[5px] lg:text-sm text-xs lg:font-medium sm:font-normal font-light ${smallTextSize}`}>{dayOfWeek}</span> {/* Day of the week (e.g., Mon) */}
        <span className={`mb-2 w-fit h-fit sm:ml-[10px] ml-[5px] lg:text-lg sm:text-normal text-sm sm:font-bold font-semibold ${monthTextSize}`}>
          {/* <span className='sm:block hidden '>{month}</span> */}
          {label}</span>
        {staffWithBirthday.map((staff) => (
          <span key={staff.name} className="sm:mx-[10px] mx-[5px] text-xs text-blue-500 font-medium break-words">
            <span className='text-[10px] sm:hidden flex'>🎉 {getInitials(staff.name)}</span>
            <span className='sm:flex hidden'>🎉 {staff.name}</span>
          </span>
        ))}
      </div>
    );
  };
  const customDayPropGetter = () => {
    // const padding = window.innerWidth < 1024 ? '0px 10px' : '50px 15px';
    return {
      style: {
        backgroundColor: 'white',
        color: '#1E272F',
        cursor: 'pointer',
        border: '0.5px solid #E7E7E7',
        margin: '0px 10px 10px 0px',
        minHeight: 'auto',
        padding: '5px',
      },
    };
  };
  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });
  const height = window.innerWidth < 640 ? 500 : window.innerWidth < 750 ? 650 : window.innerWidth < 1024 ? 650 : 750;
  return (
    <>
      {popUp && selectedstaff && selectedstaff.length > 0 &&
        <div className='fixed inset-0 z-[99999] flex items-center justify-center bg-black/20 bg-opacity-50 '>
          <div ref={popUpRef} className='w-fit rounded-lg bg-white p-3 max-h-[calc(100dvh-80px)] scrollbar-none overflow-scroll'>
            {selectedstaff.map((employee) => (
              <p key={employee.name}> 🎉 {employee.name}</p>
            ))}
          </div>
        </div>
      }
      <BigCalendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: height }}
        defaultView="month"
        toolbar={false}
        selectable={true}
        className='cursor-pointer'
        onSelectSlot={handleSelectDay}
        dayPropGetter={customDayPropGetter}
        culture="en"
        formats={{ weekdayFormat: 'dddd' }}
        components={{
          month: {
            dateHeader: CustomDateHeader,
            header: () => null,
          },
        }}
        date={defaultDate}
      />

      <style>
        {
          `
          .rbc-day-bg {
            padding: 10px;
            border-radius: 5px;
            min-height: 50px;
          }

          .cursor-pointer {
            cursor: pointer;
          }

          .custom-calendar {
            display: flex;
            flex-wrap: wrap; /* Allow wrapping */
            justify-content: space-between; /* Space out days */
          }
          .rbc-month-view {
            border: none !important;
            display: flex;
            flex-wrap: wrap;
          }

          .rbc-month-row {
            align-items: stretch;
          }

          .rbc-month-view .rbc-day-slot {
            width: 25%; /* Four days per row */
          }

          /* Remove borders between the rows (weeks) */
          .rbc-month-row {
            border: none !important;
          }
          /* Remove any top margin, padding, or border that might be causing a line */
          .rbc-header, .rbc-month-view {
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Ensure the entire calendar has no top border or padding */
          .rbc-month-view {
            border-top: none !important;
          }

          /* Also remove any leftover border from the first row (week row) */
          .rbc-month-row {
            border-top: none !important;
          }

          /* Remove any extra spacing on the calendar container itself */
          .rbc-calendar {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          `
        }
      </style>
    </>
  );
};

export { CalendarComponent }