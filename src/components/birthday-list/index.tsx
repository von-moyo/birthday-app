import { isSameMonth, isSameDay, addMonths, isWithinInterval, parseISO } from 'date-fns';
import { Cake } from 'lucide-react';
import { Staff } from '../../types/types';
import { BirthdayCard } from './birthday-card';

interface BirthdayListProps {
  staffs: Staff[];
  selectedMonth: Date;
}

const BirthdayList: React.FC<BirthdayListProps> = ({ staffs, selectedMonth }) => {
  const today = new Date();
  const nextFourMonths = addMonths(today, 4);

  const normalizeDate = (dateString: string) => {
    const dob = parseISO(dateString);
    return new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  };

  const todaysBirthdays = staffs.filter((staff) => isSameDay(normalizeDate(staff.date_of_birth), today));

  const monthlyBirthdays = staffs.filter((staff) => {
    const dob = normalizeDate(staff.date_of_birth);
    return isSameMonth(dob, selectedMonth) && !isSameDay(dob, today);
  });

  const upcomingBirthdays = staffs.filter((staff) => {
    const dob = normalizeDate(staff.date_of_birth);
    return isWithinInterval(dob, { start: today, end: nextFourMonths }) && !isSameMonth(dob, selectedMonth) && !todaysBirthdays.includes(staff);
  });

  return (
    <div className="grid">

      {todaysBirthdays.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {todaysBirthdays.map((staff) => <BirthdayCard key={staff.id} staff={staff} />)}
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <Cake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No birthdays today</p>
        </div>
      )}

      {monthlyBirthdays.length > 0 ? (
        <div>
          <h2 className="sm:text-xl text-lg font-semibold text-gray-800 my-8">🎂 Other Birthdays This Month</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {monthlyBirthdays.map((staff) => <BirthdayCard key={staff.id} staff={staff} />)}
          </div>
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <Cake className="w-12 h-12 text-gray-400 mx-auto my-8" />
          <p className="text-gray-500 text-lg">No other birthdays this month</p>
        </div>
      )}

      {upcomingBirthdays.length > 0 ? (
        <div>
          <h2 className="sm:text-xl text-lg font-semibold text-gray-800 my-8">📅 Upcoming Birthdays</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingBirthdays.map((staff) => <BirthdayCard key={staff.id} staff={staff} isUpcoming />)}
          </div>
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
