import { isSameMonth, isSameDay, addMonths, isWithinInterval, parseISO } from 'date-fns';
import { Cake } from 'lucide-react';
import { Employee } from '../../types';
import { BirthdayCard } from './birthday-card';

interface BirthdayListProps {
  employees: Employee[];
  selectedMonth: Date;
}

const BirthdayList: React.FC<BirthdayListProps> = ({ employees, selectedMonth }) => {
  const today = new Date();
  const nextFourMonths = addMonths(today, 4);

  const normalizeDate = (dateString: string) => {
    const dob = parseISO(dateString);
    return new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  };

  const todaysBirthdays = employees.filter((employee) => isSameDay(normalizeDate(employee.date_of_birth), today));

  const monthlyBirthdays = employees.filter((employee) => {
    const dob = normalizeDate(employee.date_of_birth);
    return isSameMonth(dob, selectedMonth) && !isSameDay(dob, today);
  });

  const upcomingBirthdays = employees.filter((employee) => {
    const dob = normalizeDate(employee.date_of_birth);
    return isWithinInterval(dob, { start: today, end: nextFourMonths }) && !isSameMonth(dob, selectedMonth) && !todaysBirthdays.includes(employee);
  });

  return (
    <div className="grid">

      {todaysBirthdays.length > 0 ? (
        todaysBirthdays.map((employee) => <BirthdayCard key={employee.id} employee={employee} />)
      ) : (
        <div className="col-span-full text-center py-12">
          <Cake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No birthdays today</p>
        </div>
      )}

      {monthlyBirthdays.length > 0 ? (
        <div>
          <h2 className="sm:text-xl text-lg font-semibold text-gray-800 my-8">🎂 Birthdays This Month</h2>
          {monthlyBirthdays.map((employee) => <BirthdayCard key={employee.id} employee={employee} />)}
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <Cake className="w-12 h-12 text-gray-400 mx-auto my-8" />
          <p className="text-gray-500 text-lg">No birthdays this month</p>
        </div>
      )}

      {upcomingBirthdays.length > 0 ? (
        <div>
          <h2 className="sm:text-xl text-lg font-semibold text-gray-800 my-8">📅 Upcoming Birthdays</h2>
          {upcomingBirthdays.map((employee) => <BirthdayCard key={employee.id} employee={employee} isUpcoming />)}
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <Cake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No birthdays upcoming</p>
        </div>
      )}
    </div>
  );
};

export { BirthdayList };
