import React from "react";
import { Cake, PenLine, Trash2, Pencil } from "lucide-react";
import { StaffDB } from "../../types";
import {
  formatDate,
  formatDepartment,
  formatName,
  isBirthday,
  getGridColsClass,
} from "./utils";

export type TableBodyItem = {
  name: string;
} & Pick<
  StaffDB,
  "id" | "is_enabled" | "department" | "date_of_birth" | "email" | "staff_type"
>;

export interface StaffTableProps {
  tableBodyItems: TableBodyItem[];
  shownHeaders: { index: number; title: string; key: string }[];
  tableBodyClassName?: string;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  isCheckedHandler: (id: string) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  tableBodyItems,
  shownHeaders,
  tableBodyClassName,
  tableBodyItemClassName,
  tableBodyRowClassName,
  isCheckedHandler,
}) => {
  if (tableBodyItems.length === 0) {
    return (
      <div className="flex gap-4 py-[60px] flex-col items-center justify-center">
        <p className="text-xs font-medium text-[#1E272F]">No Data</p>
        <p className="text-xs font-light text-[#898989] w-[60%] text-center">
          There's no data.
        </p>
      </div>
    );
  }

  return (
    <div className={`table-body ${tableBodyClassName || ""}`}>
      {tableBodyItems.map((item, index) => (
        <div
          key={`staff-row-${item.id ?? index}`}
          className={`grid items-center ${getGridColsClass(
            shownHeaders.length
          )} 
            ${
              tableBodyRowClassName || ""
            } sm:py-3 sm:px-4 px-2 py-2 sm:text-sm gap-2 sm:gap-0 text-xs`}
        >
          {shownHeaders.map((header) => {
            if (header.key === "actions") {
              return (
                <div
                  key={`cell-${header.key}`}
                  className={tableBodyItemClassName}
                >
                  <div className="text-[#454545] flex gap-4 items-center">
                    <button
                      type="button"
                      className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
                      title="Edit"
                    >
                      <Pencil className="size-4 pointer-events-auto" />
                      <span className="hidden 2xl:block">Edit</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
                      title="Delete"
                    >
                      <Trash2 className="size-4 pointer-events-auto" />
                      <span className="hidden 2xl:block">Delete</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
                      title="Customize Message"
                    >
                      <PenLine className="size-4 pointer-events-auto" />
                      <span className="hidden 2xl:block">
                        Customize Message
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            const value = item[header.key as keyof typeof item] ?? "";

            if (typeof value === "boolean") {
              return (
                <input
                  key={`checkbox-${header.key}-${item.id}`}
                  type="checkbox"
                  name={item.name}
                  id={item.name}
                  checked={item.is_enabled || false}
                  onChange={() => isCheckedHandler(item.id ?? "")}
                />
              );
            }

            let content;
            if (
              header.title.toLowerCase().includes("date") ||
              header.title.toLowerCase().includes("_at")
            ) {
              content = formatDate(value);
            } else if (header.title.toLowerCase().includes("department")) {
              content = formatDepartment(value);
            } else if (header.title.toLowerCase().includes("name")) {
              content = formatName(value);
            } else {
              content = value;
            }

            return (
              <div
                key={`cell-${header.key}-${header.index}`}
                className={tableBodyItemClassName}
              >
                <div className="text-[#454545] flex gap-2 items-center">
                  <span className="line-clamp-1">{content}</span>
                  {header.key === "name" && isBirthday(item.date_of_birth) && (
                    <Cake size={16} className="text-pink-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
