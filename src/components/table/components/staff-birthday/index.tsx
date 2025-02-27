import { differenceInYears, format, startOfDay } from "date-fns";
import { Employee } from "../../../../types";

interface TableBodyProps {
  tableBodyItems: Employee[];
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  tableBodyStatus?: string;
  tableBody?: string;
  statusItem?: string;
  statusColor?: string;
  shownHeaders: { index: number; title: string; }[];
}

const StaffBirthdayTable: React.FC<TableBodyProps> = ({
  tableBody,
  tableBodyItems,
  tableBodyItemClassName,
  tableBodyRowClassName,
  shownHeaders,
}) => {

  const today = startOfDay(new Date());
  
  const formatDateWithLabel = (dateValue: string | Date) => {
    // Convert to Date object safely
    const dateObj = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    const dateAtStartOfDay = startOfDay(dateObj);
    
    // Format for display
    const formattedDate = format(dateAtStartOfDay, 'MMM d');
    
    // Check if it's today or tomorrow based on month and day only
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const birthdayMonth = dateAtStartOfDay.getMonth();
    const birthdayDay = dateAtStartOfDay.getDate();
    
    if (currentMonth === birthdayMonth && currentDay === birthdayDay) {
      return `${formattedDate} (today)`;
    } else if (
      currentMonth === birthdayMonth && 
      currentDay + 1 === birthdayDay
    ) {
      return `${formattedDate} (tomorrow)`;
    }
    
    return formattedDate;
  };

  return (
    <>{tableBodyItems.length === 0 ?
      <div className='flex gap-4 py-[60px] flex-col items-center justify-center'>
        <p className='text-xs font-medium text-[#1E272F]'>No Birthdays</p>
        <p className='text-xs font-light text-[#898989] w-[60%] text-center'>No birthdays found for this month.</p>

      </div>
      :
      <div className={`table-body ${tableBody}`}>
        {tableBodyItems.map((item, index) => {
          const age = differenceInYears(today, new Date(item.date_of_birth));
          return (
            <div
              key={`body-${index}`}
            className={`cursor-pointer grid grid-cols-[1fr_1fr_1fr_0.5fr] items-center ${tableBodyRowClassName} sm:py-3 sm:px-4 px-2 py-2 sm:text-sm gap-2 sm:gap-0 text-xs`}
          >
            {shownHeaders.map((header, headerIndex) => (
              <div
                key={headerIndex}
                className={`${tableBodyItemClassName} flex-1`}
              >
                {header.title === "Name" && (
                  <span
                    className="hover:underline text-[#454545]"
                  >
                    <p className="line-clamp-1">{item?.name}</p>
                  </span>
                )}
                {header.title === "Department" && (
                  <div
                    className="text-[#454545] flex gap-2 items-center"
                  >
                    <p className="line-clamp-1">{item?.department}</p>
                  </div>
                )}
                {header.title === "Birthday" && (
                  <span
                    className="hover:underline text-[#454545]"
                  >
                    {formatDateWithLabel(new Date(item?.date_of_birth))}
                  </span>
                )}
                {header.title === "Age" && (
                  <span
                    className="hover:underline text-[#454545]"
                  >
                    {age}
                  </span>
                )}
              </div>
            ))}
          </div>
          )
        })}
      </div>}
    </>

  );
};

export { StaffBirthdayTable };
