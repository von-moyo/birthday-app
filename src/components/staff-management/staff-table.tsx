import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cake, PenLine, Trash2, Pencil, Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";
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

type ActionButton = {
  title: string;
  icon: React.ElementType;
  onClick: (id: string) => void;
};

export interface StaffTableProps {
  tableBodyItems: TableBodyItem[];
  shownHeaders: { index: number; title: string; key: string }[];
  tableBodyClassName?: string;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  isCheckedHandler: (id: string) => void;
  deleteStaffHandler: (id: string) => void;
  customizeMessageHandler: (id: string) => void;
  editStaffHandler: (id: string) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  tableBodyItems,
  shownHeaders,
  tableBodyClassName,
  tableBodyItemClassName,
  tableBodyRowClassName,
  isCheckedHandler,
  deleteStaffHandler,
  customizeMessageHandler,
  editStaffHandler,
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

  const actionButtons: ActionButton[] = [
    {
      title: "Edit",
      icon: Pencil,
      onClick: editStaffHandler,
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: deleteStaffHandler,
    },
    {
      title: "Customize Message",
      icon: PenLine,
      onClick: customizeMessageHandler,
    },
  ];

  const formatCellContent = (
    header: { title: string; key: string },
    value: string | boolean | undefined
  ) => {
    if (typeof value === "boolean") return value;

    if (value === undefined) return "";

    if (
      header.title.toLowerCase().includes("date") ||
      header.title.toLowerCase().includes("_at")
    ) {
      return formatDate(value);
    } else if (header.title.toLowerCase().includes("department")) {
      return formatDepartment(value);
    } else if (header.title.toLowerCase().includes("name")) {
      return formatName(value);
    }
    return value;
  };

  const DesktopActionButton = ({
    button,
    itemId,
  }: {
    button: ActionButton;
    itemId: string;
  }) => (
    <button
      type="button"
      className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
      title={button.title}
      onClick={() => button.onClick(itemId)}
    >
      <button.icon className="size-4 pointer-events-auto" />
      <span className="hidden 2xl:block">{button.title}</span>
    </button>
  );

  const MobileActionMenuItem = ({
    button,
    itemId,
  }: {
    button: ActionButton;
    itemId: string;
  }) => (
    <DropdownMenuItem className="cursor-pointer pointer-events-auto">
      <button
        type="button"
        className="flex items-center gap-x-2 w-full cursor-[inherit] pointer-events-[inherit]"
        title={button.title}
        onClick={() => button.onClick(itemId)}
      >
        <button.icon className="size-4 pointer-events-auto" />
        <span>{button.title}</span>
      </button>
    </DropdownMenuItem>
  );

  const ActionCell = ({ itemId }: { itemId: string }) => (
    <>
      <div className={cn("hidden sm:block", tableBodyItemClassName)}>
        <div className="text-[#454545] flex gap-4 items-center">
          {actionButtons.map((button) => (
            <DesktopActionButton
              key={`desktop-${button.title}`}
              button={button}
              itemId={itemId}
            />
          ))}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="sm:hidden size-4 outline-none border-none cursor-pointer bg-transparent">
            <Ellipsis className="text-inherit size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-[#454545]">
          {actionButtons.map((button) => (
            <MobileActionMenuItem
              key={`mobile-${button.title}`}
              button={button}
              itemId={itemId}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

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
            // Handle actions column
            if (header.key === "actions") {
              return (
                <ActionCell key={`cell-${header.key}`} itemId={item.id ?? ""} />
              );
            }

            const value = item[header.key as keyof typeof item] ?? "";

            // Handle boolean/checkbox column
            if (typeof value === "boolean") {
              return (
                <input
                  key={`checkbox-${header.key}-${item.id}`}
                  type="checkbox"
                  name={item.name}
                  id={item.name}
                  checked={item.is_enabled || false}
                  onChange={() => isCheckedHandler(item.id ?? "")}
                  className="cursor-pointer"
                  title="Enable Notifications?"
                />
              );
            }

            // Handle content cells
            const content = formatCellContent(header, value);
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
