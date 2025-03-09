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
import { formatDate, formatDepartment, formatName, isBirthday } from "./utils";
import { Dialog, DialogContent } from "../ui/dialog";
import StaffDialog from "./staff-dialog";
import MessageDialog from "./message-dialog";
import { getInitials } from "@/utils";

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
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  if (tableBodyItems.length === 0) {
    return (
      <div className="flex gap-4 py-[60px] flex-col items-center justify-center">
        <p className="text-xs font-medium text-[#1E272F]">Oops!</p>
        <p className="text-xs font-light text-[#898989] w-[60%] text-center">
          No Staffs have been added yet.
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

  const ActionCell = ({
    data,
    editDialogOpen,
    setEditDialogOpen,
  }: {
    data: TableBodyItem;
    editDialogOpen: boolean;
    setEditDialogOpen: (data: boolean) => void;
  }) => {
    const [messageDialogOpen, setMessageDialogOpen] = React.useState(false);

    return (
      <>
        {/* Desktop Actions */}
        <div className={cn("hidden sm:block my-auto", tableBodyItemClassName)}>
          <div className="text-[#454545] flex gap-4 items-center">
            {/* Edit Button */}
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

            {/* Delete Button */}
            <button
              type="button"
              className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
              title="Delete"
              onClick={() => deleteStaffHandler(data.id || "")}
            >
              <Trash2 className="size-4 pointer-events-auto" />
              <span className="hidden 2xl:block">Delete</span>
            </button>

            {/* Customize Message Button */}
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
        <div className="sm:hidden my-auto">
          {/* Edit Dialog */}
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="bg-white">
              <StaffDialog
                mode="update"
                initialValues={data}
                onSubmit={(updatedData) => {
                  editStaffHandler(updatedData);
                  setEditDialogOpen(false);
                }}
                trigger={null} // No trigger needed here
              />
            </DialogContent>
          </Dialog>

          {/* Message Dialog */}
          <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
            <DialogContent className="bg-white">
              <MessageDialog
                initialValues={{ staff: data, message: "" }}
                mode="mobile"
                open={messageDialogOpen} // Pass the open state
                onOpenChange={setMessageDialogOpen} // Pass the onOpenChange handler
                trigger={null} // No trigger needed here
              />
            </DialogContent>
          </Dialog>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="size-4 outline-none border-none cursor-pointer bg-transparent">
                <Ellipsis className="text-inherit size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-[#454545]">
              {/* Edit Option */}
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                <div className="flex items-center gap-x-2">
                  <Pencil className="size-4" />
                  <span>Edit</span>
                </div>
              </DropdownMenuItem>

              {/* Delete Option */}
              <DropdownMenuItem
                onClick={() => deleteStaffHandler(data.id || "")}
              >
                <div className="flex items-center gap-x-2">
                  <Trash2 className="size-4" />
                  <span>Delete</span>
                </div>
              </DropdownMenuItem>

              {/* Customize Message Option */}
              <DropdownMenuItem onClick={() => setMessageDialogOpen(true)}>
                <div className="flex items-center gap-x-2">
                  <PenLine className="size-4" />
                  <span>Customize Message</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  };

  return (
    <div className={`table-body ${tableBodyClassName || ""}`}>
      {tableBodyItems.map((item, index) => (
        <div
          key={`staff-row-${item.id ?? index}`}
          className={`grid grid-cols-[0.2fr_1fr_1fr_1fr_1fr_0.5fr]  sm:grid-cols-[0.2fr_1fr_1fr_1fr_1fr_1fr] 
            ${tableBodyRowClassName || ""} sm:py-3 py-2 sm:text-sm text-xs`}
        >
          {shownHeaders.map((header) => {
            // Handle actions column
            if (header.key === "actions") {
              return (
                <ActionCell
                  key={`cell-${header.key}`}
                  data={item}
                  editDialogOpen={editDialogOpen}
                  setEditDialogOpen={setEditDialogOpen}
                />
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
                  className="cursor-pointer size-3 my-auto md:size-4 mx-auto"
                  title="Enable Notifications?"
                />
              );
            }

            const noPfp =
              !item?.profile_image_url || item?.profile_image_url === "string";

            // Handle actions column
            if (header.key === "name") {
              return (
                <div className="flex items-center gap-2">
                  <div
                    className={`grid h-[27px] w-[27px] place-content-center rounded-[15px] ${
                      noPfp && "border"
                    } border-gray-300 border-opacity-50 overflow-hidden`}
                  >
                    {!noPfp ? (
                      <img
                        src={`${item?.profile_image_url}`}
                        alt="Profile picture"
                        loading="eager"
                        className="h-full w-full object-cover rounded-[15px]"
                      />
                    ) : (
                      <p className="text-[12px]">
                        {getInitials(`${item.first_name} ${item.last_name}`)}
                      </p>
                    )}
                  </div>
                  <p className="line-clamp-1">{`${item?.first_name} ${item?.last_name}`}</p>
                </div>
              );
            }

            // Handle content cells
            const content = formatCellContent(header, value);
            return (
              <div
                key={`cell-${header.key}-${header.index}`}
                className={`${tableBodyItemClassName} !line-clamp-1 my-auto`}
              >
                <div className="text-[#454545] flex gap-2 items-center !line-clamp-1">
                  <span>{content}</span>
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
