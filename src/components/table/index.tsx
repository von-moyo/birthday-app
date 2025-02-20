// TableHeader Component
interface TableHeaderProps {
  tableHeaderTitles: { index: number, title: string }[];
  tableHeadItemClassName?: string;
  tableContainerClassName?: string;
  tableHeaderClassName?: string;
  headerStyle?: string;
  checkAll?: () => void;
}
const TableHeader: React.FC<TableHeaderProps> = ({
  tableHeaderTitles,
  tableHeadItemClassName,
  tableHeaderClassName,
  headerStyle,
  checkAll
}) => {
  return (
    <section className={`grid grid-cols-3 w-full gap-2 sm:gap-0 sm:px-4 px-2 sm:py-3 py-2 sticky top-0 z-10 ${tableHeaderClassName}`}>
      {tableHeaderTitles.map((header, idx) => {
        return (
          <div
            key={idx}
            className={`flex ${headerStyle}`}
          >
            <span
              className={`text-xs sm:text-sm font-medium ${tableHeadItemClassName}`}
              onClick={() => header.index === 0 && checkAll}
            >
              {header.title}
            </span>
          </div>
        );
      })}
    </section>
  );
};

// TableBody Component
interface TableBodyProps {
  customClassName?: string;
  children: any;
}
const TableBody: React.FC<TableBodyProps> = ({
  children,
  customClassName = ""
}) => {
  return (
    <section className={`w-full flex flex-col items-center ${customClassName}`}>
      {children}
    </section>
  );
};

// TableBodyRow Component
const TableBodyRow: React.FC<TableBodyProps> = ({
  children,
  customClassName = ""
}) => {
  return (
    <div
      className={`w-full sm:px-4 px-2 sm:py-6 py-4 text-sm font-light cursor-pointer hover:bg-gray-50 ${customClassName}`}
    >
      {children}
    </div>
  );
};


// Main Table Component
interface TableProps {
  tableHeaderTitles: { index: number, title: any }[];
  tableBody: React.ReactElement;
  emptyTable?: {
    show: boolean;
    element: any;
  };
  customTableClasses?: {
    tableHeadItemClassName?: string;
    tableContainerClassName?: string;
    tableHeaderClassName?: string;
    headerStyle?: string;
  };
  headerVisibility?: boolean[]
  hideHeaders?: boolean;
  checkAll?: () => void
}
const Table: React.FC<TableProps> = ({
  tableHeaderTitles,
  tableBody,
  emptyTable,
  hideHeaders,
  customTableClasses,
  checkAll,
}) => {
  const {
    tableHeaderClassName,
    tableHeadItemClassName,
    tableContainerClassName,
    headerStyle = "",
  } = customTableClasses || {};

  return (
    <>
      {!emptyTable?.show ? (
        <section className="w-full overflow-x-auto scrollbar-none">
          <section
            className={`w-full flex flex-col ${tableContainerClassName}`}
          >
            {!hideHeaders && (
              <TableHeader
                tableHeaderClassName={tableHeaderClassName}
                tableHeadItemClassName={tableHeadItemClassName}
                tableHeaderTitles={tableHeaderTitles}
                headerStyle={headerStyle}
                checkAll={checkAll}
              />
            )}
            {tableBody}
          </section>
        </section>
      ) : (
        <>{emptyTable.element}</>
      )}
    </>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableBodyRow
};