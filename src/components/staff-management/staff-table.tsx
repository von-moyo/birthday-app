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
import { Dialog, DialogContent } from "../ui/dialog";
import StaffDialog from "./staff-dialog";
import MessageDialog from "./message-dialog";

export type TableBodyItem = {
  name: string;
} & StaffDB;

export interface StaffTableProps {
  tableBodyItems: TableBodyItem[];
  shownHeaders: { index: number; title: string; key: string }[];
  tableBodyClassName?: string;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  isCheckedHandler: (id: string) => void;
  deleteStaffHandler: (id: string) => void;
  editStaffHandler: (data: StaffDB) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  tableBodyItems,
  shownHeaders,
  tableBodyClassName,
  tableBodyItemClassName,
  tableBodyRowClassName,
  isCheckedHandler,
  deleteStaffHandler,
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

  const ActionCell = ({ data }: { data: TableBodyItem }) => {
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [messageDialogOpen, setMessageDialogOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    return (
      <>
        {/* Desktop Actions */}
        <div className={cn("hidden sm:block", tableBodyItemClassName)}>
          <div className="text-[#454545] flex gap-4 items-center">
            <StaffDialog
              mode="update"
              initialValues={data}
              onSubmit={(updatedData) => {
                editStaffHandler(updatedData);
                setEditDialogOpen(false);
              }}
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
                  title="Edit"
                >
                  <Pencil className="size-4 pointer-events-auto" />
                  <span className="hidden 2xl:block">Edit</span>
                </button>
              }
            />
            <MessageDialog
              initialValues={{ staff: data, message: "" }}
              mode="desktop"
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
                  title="Customize Message"
                >
                  <PenLine className="size-4 pointer-events-auto" />
                  <span className="hidden 2xl:block">Customize Message</span>
                </button>
              }
            />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="sm:hidden">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button className="size-4 outline-none border-none cursor-pointer bg-transparent">
                <Ellipsis className="text-inherit size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => deleteStaffHandler(data.id || "")}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setMessageDialogOpen(true)}>
                <PenLine className="mr-2 h-4 w-4" />
                <span>Customize Message</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Edit Dialog */}
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <StaffDialog
                mode="update"
                initialValues={data}
                onSubmit={(updatedData) => {
                  editStaffHandler(updatedData);
                  setEditDialogOpen(false);
                }}
                trigger={null}
              />
            </DialogContent>
          </Dialog>

          {/* Message Dialog */}
          <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
            <DialogContent>
              <MessageDialog
                initialValues={{ staff: data, message: "" }}
                mode="mobile"
                trigger={null}
              />
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  };

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
              return <ActionCell key={`cell-${header.key}`} data={item} />;
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
