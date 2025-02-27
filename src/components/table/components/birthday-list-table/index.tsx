import { Staff } from "../../../../types";

interface TableBodyProps {
  tableBodyItems: Staff[];
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  tableBodyStatus?: string;
  tableBody?: string;
  statusItem?: string;
  statusColor?: string;
  shownHeaders: { index: number; title: string; }[];
}

const BirthdayListTable: React.FC<TableBodyProps> = ({
  tableBody,
  tableBodyItems,
  tableBodyItemClassName,
  tableBodyRowClassName,
  shownHeaders,
}) => {

  const formatDate = (dateTimeString: string) => {
    if (dateTimeString) {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year} - ${month} - ${day}`;
    }

  }

  return (
    <>{tableBodyItems.length === 0 ?
      <div className='flex gap-4 py-[60px] flex-col items-center justify-center'>
        <p className='text-xs font-medium text-[#1E272F]'>No Birthdays Yet</p>
        <p className='text-xs font-light text-[#898989] w-[60%] text-center'>No birthdays found at this time.</p>

      </div>
      :
      <div className={`table-body ${tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <div
            key={`body-${index}`}
            className={`cursor-pointer grid grid-cols-3 items-center ${tableBodyRowClassName} sm:py-3 sm:px-4 px-2 py-2 sm:text-sm gap-2 sm:gap-0 text-xs`}
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
                {header.title === "Date" && (
                  <span
                    className="hover:underline text-[#454545]"
                  >
                    {formatDate(item?.date_of_birth)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>}
    </>

  );
};

export { BirthdayListTable };
