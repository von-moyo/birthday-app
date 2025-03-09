import React from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { StaffFormValues } from "@/types";
import { formatDepartment } from "./utils";
import StaffDialog from "./staff-dialog";

const defaultValues: StaffFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  department: undefined,
  date_of_birth: "2025-03-02",
  staff_type: undefined,
  notification_type: undefined,
  profile_image_url: "",
  is_enabled: undefined,
};

interface FilterSectionProps {
  searchTerm: string;
  selectedDepartment: string;
  selectedStaffType: string;
  departments: string[];
  staffTypes: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStaffTypeChange: (value: string) => void;
  addNewStaffHandler: (data: StaffFormValues) => Promise<void>;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  searchTerm,
  selectedDepartment,
  selectedStaffType,
  departments,
  staffTypes,
  onSearchChange,
  onDepartmentChange,
  onStaffTypeChange,
  addNewStaffHandler,
}) => {
  return (
    <div className="w-full">
      {/* Mobile layout: single column */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Search input - full width on mobile, 4 columns on desktop */}
        <div className="sm:col-span-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Department filter - 3 columns on desktop */}
        <div className="sm:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter size={16} className="text-gray-400" />
          </div>
          <select
            className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {formatDepartment(department)}
              </option>
            ))}
          </select>
        </div>

        {/* Staff type filter - 3 columns on desktop */}
        <div className="sm:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter size={16} className="text-gray-400" />
          </div>
          <select
            className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedStaffType}
            onChange={(e) => onStaffTypeChange(e.target.value)}
          >
            <option value="">All Staff Types</option>
            {staffTypes.map((staffType) => (
              <option key={staffType} value={staffType}>
                {formatDepartment(staffType)}
              </option>
            ))}
          </select>
        </div>

        {/* Add new staff button - 2 columns on desktop */}
        <div className="sm:col-span-2">
          <StaffDialog
            mode="create"
            initialValues={defaultValues}
            onSubmit={addNewStaffHandler}
            trigger={
              <Button
                type="button"
                className="w-full py-2 px-4 text-sm font-medium text-white border border-gray-300 rounded-lg cursor-pointer bg-green-600"
              >
                Add New Staff
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
