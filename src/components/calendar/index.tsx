import React from 'react';
import { Calendar as BigCalendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Employee } from '../../types/types';
const localizer = momentLocalizer(moment);

interface CalendarProps {
  month: number;
  employees: Employee[];
}

const CalendarComponent: React.FC<CalendarProps> = ({ month, employees }) => {
  const handleSelectDay = (slotInfo: SlotInfo) => {
    console.log(slotInfo.start);
  };

  const defaultDate = moment().month(month ?? new Date().getMonth()).toDate();
  const CustomDateHeader = ({ label, date }: any) => {
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const employeesWithBirthday = employees.filter((employee) => {
      const birthDate = moment(employee.date_of_birth);
      return birthDate.date() === date.getDate() && birthDate.month() === date.getMonth();
    });
    const monthTextSize = window.innerWidth < 500 && 'text-xs';
    const smallTextSize = window.innerWidth < 500 && 'text-[10px]';
    return (
      <div className={`flex flex-col text-[0.9rem] text-left`}>
        <span className={`ml-[10px] mt-[10px] lg:text-sm text-xs lg:font-medium sm:font-normal font-light ${smallTextSize}`}>{dayOfWeek}</span> {/* Day of the week (e.g., Mon) */}
        <span className={`ml-[10px] lg:text-lg sm:text-normal text-sm sm:font-bold font-semibold ${monthTextSize}`}>{month}{window.innerWidth < 460 && <br />}{' '}{label}</span>
        {employeesWithBirthday.map((employee) => (
          <span key={employee.name} className="ml-[10px] text-xs text-blue-500 font-medium break-words">
            🎉{employee.name}
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
        // padding: padding,
        minHeight: 'auto', 
        padding: '5px',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        // minHeight: 'auto',  // Auto height based on content
        // margin: '0px 10px 10px 0px',
      },
    };
  };
  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });
  const height = window.innerWidth < 640 ? 350 : window.innerWidth < 1024 ? 500 : 750;
  return (
    <>
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