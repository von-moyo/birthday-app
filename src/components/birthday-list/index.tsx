import { format, isSameMonth, isSameDay } from 'date-fns';
import { Cake, Gift } from 'lucide-react';
import { Employee } from '../../types';

interface BirthdayListProps {
  employees: Employee[];
  selectedMonth: Date;
}

const BirthdayList: React.FC<BirthdayListProps> = ({ employees, selectedMonth }) => {
  const today = new Date();

  const filteredEmployees = employees.filter((employee) => {
    const dob = new Date(employee.date_of_birth);
    return isSameMonth(dob, selectedMonth);
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredEmployees.map((employee) => {
        const dob = new Date(employee.date_of_birth);
        const isBirthdayToday = isSameDay(new Date(employee.date_of_birth), today);

        return (
          <div
            key={employee.id}
            className={`card transition-all duration-200 hover:shadow-lg ${
              isBirthdayToday ? 'ring-2 ring-primary-500 bg-primary-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {isBirthdayToday ? (
                  <Gift className="w-8 h-8 text-primary-500" />
                ) : (
                  <Cake className="w-8 h-8 text-gray-400" />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{employee.name}</h3>
                  <p className="text-gray-600">{employee.department}</p>
                  <p className="text-sm text-gray-500">
                    {format(dob, 'MMMM do')}
                  </p>
                </div>
              </div>
              {isBirthdayToday && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  Today!
                </span>
              )}
            </div>
          </div>
        );
      })}
      {filteredEmployees.length === 0 && (
        <div className="col-span-full text-center py-12">
          <Cake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No birthdays this month
          </p>
        </div>
      )}
    </div>
  );
}

export { BirthdayList }