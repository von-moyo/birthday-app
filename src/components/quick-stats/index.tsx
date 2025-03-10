import { isSameMonth, isSameDay, addMonths, isWithinInterval, parseISO } from 'date-fns';   

import { Table } from '../table';
import { getNextBirthday } from '../../utils/getNextBirthday';
import { Staff } from '../../types/types';
import { BirthdayListTable } from '../table/components/birthday-list-table';

type StatsProps = {
  totalStaff: number;
  birthdaysThisMonth: number;
  nextBirthday: string;
};


interface MiniBirthdayListProps {
  staffs: Staff[];
  selectedMonth: Date;
}

const MiniBirthdayList: React.FC<MiniBirthdayListProps> = ({ staffs, selectedMonth }) => {
  const today = new Date();
  const nextFourMonths = addMonths(today, 4);

  const normalizeDate = (dateString: string) => {
    const dob = parseISO(dateString);
    return new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  };

  // Filter today's birthdays
  const todaysBirthdays = staffs.filter((staff) => isSameDay(normalizeDate(staff.date_of_birth), today));

  // Filter birthdays this month (excluding today's birthdays)
  const monthlyBirthdays = staffs.filter((staff) => {
    const dob = normalizeDate(staff.date_of_birth);
    return isSameMonth(dob, selectedMonth);
  });

  // Filter upcoming birthdays within the next 4 months
  const upcomingBirthdays = staffs.filter((staff) => {
    const dob = normalizeDate(staff.date_of_birth);
    return isWithinInterval(dob, { start: today, end: nextFourMonths }) && !isSameMonth(dob, selectedMonth) && !todaysBirthdays.includes(staff);
  });

  const Stats: React.FC<StatsProps> = ({ totalStaff, birthdaysThisMonth, nextBirthday }) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="sm:p-4 p-2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.09)] rounded-lg text-center flex flex-col justify-between">
        <h3 className="text-gray-600 sm:text-base text-xs">Total Staff</h3>
        <p className="sm:text-2xl text-lg font-bold">{totalStaff}</p>
      </div>
      <div className="sm:p-4 p-2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.09)] rounded-lg text-center flex flex-col justify-between">
        <h3 className="text-gray-600 sm:text-base text-xs">Birthdays This Month</h3>
        <p className="sm:text-2xl text-lg font-bold">{birthdaysThisMonth}</p>
      </div>
      <div className="sm:p-4 p-2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.09)] rounded-lg text-center flex flex-col justify-between">
        <h3 className="text-gray-600 sm:text-base text-xs">Next Birthday</h3>
        <p className="sm:text-2xl text-lg font-bold">{nextBirthday}</p>
      </div>
      <div className="sm:p-4 p-2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.09)] rounded-lg text-center flex flex-col justify-between">
        <h3 className="text-gray-600 sm:text-base text-xs">Ratio of Birthday Months</h3>
        <p className="sm:text-2xl text-lg font-bold">{(birthdaysThisMonth / totalStaff * 100).toFixed()}%</p>
      </div>
    </div>
  );

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
      title: "Date",
    },
  ];

  return (
    <div className="grid gap-6">
      <h1 className="md:text-2xl sm:text-xl text-lg font-bold text-gray-900 sm:mt-6 mt-2">Employee Dashboard</h1>
      <Stats totalStaff={staffs.length} birthdaysThisMonth={monthlyBirthdays.length} nextBirthday={getNextBirthday(staffs)} />
      <Table
        tableHeaderTitles={shownHeaders}
        tableBody={
          <BirthdayListTable
            tableBody="custom-body-class"
            tableBodyItems={upcomingBirthdays}
            tableBodyItemClassName=""
            tableBodyRowClassName="grid text-xs border my-3 bg-[#FBFBFB] border-[#E7E7E7] border-opacity-50 rounded-[12px]"
            shownHeaders={shownHeaders}
          />
        }
        customTableClasses={{
          tableContainerClassName: "",
          tableHeaderClassName: "grid text-[#454242] text-sm",
          tableHeadItemClassName: "flex items-end ",
          headerStyle: "",
        }}
      />
    </div>
  );
};

export { MiniBirthdayList };
