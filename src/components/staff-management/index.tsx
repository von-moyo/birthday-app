import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useApiRequest, APIRequestStatuses } from "../../hooks";
import { Table } from "../table";
import { Staff, StaffFormValues } from "../../types";
import { StaffTable, TableBodyItem } from "./staff-table";
import { FilterSection } from "./filter-section";
import { getGridColsClass } from "./utils";
import { Toaster } from "@/components/ui/sonner";

const API_BASE_URL = "https://hameedah.pythonanywhere.com/api/admin";
const STAFF_ENDPOINT = `${API_BASE_URL}/staff/`;

const StaffManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedStaffType, setSelectedStaffType] = useState<string>("");
  const [filteredStaff, setFilteredStaff] = useState<TableBodyItem[]>([]);

  const { data, error, run, requestStatus } = useApiRequest({
    status: APIRequestStatuses.idle,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = axios.get(`${STAFF_ENDPOINT}?format=json`);
        run(promise);
      } catch (error) {
        console.error("CORS error:", error);
      }
    };

    fetchData();

    // TODO: Remove?
    return () => {};
  }, [run]);

  const tableHeaders = [
    { index: 0, title: "🔔", key: "is_enabled" },
    { index: 1, title: "Name", key: "name" },
    { index: 2, title: "Department", key: "department" },
    { index: 3, title: "Date of Birth", key: "date_of_birth" },
    { index: 4, title: "Email", key: "email" },
    { index: 5, title: "Actions", key: "actions" },
  ];

  const tableData: TableBodyItem[] = useMemo(() => {
    return (data?.data || []).map((member: Staff) => ({
      id: member.id,
      is_enabled: member.is_enabled,
      name: `${member.first_name} ${member.last_name}`,
      department: member.department,
      date_of_birth: member.date_of_birth,
      email: member.email,
      staff_type: member.staff_type,
    }));
  }, [data]);

  const departments = useMemo(() => {
    return Array.from(
      new Set(tableData.map((member) => member.department).filter(Boolean))
    );
  }, [tableData]);

  const staffTypes = useMemo(() => {
    return Array.from(
      new Set(tableData.map((member) => member.staff_type).filter(Boolean))
    );
  }, [tableData]);

  useEffect(() => {
    let filtered = tableData;

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((member) =>
        member.name.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(
        (member) => member.department === selectedDepartment
      );
    }

    if (selectedStaffType) {
      filtered = filtered.filter(
        (member) => member.staff_type === selectedStaffType
      );
    }

    setFilteredStaff(filtered);
  }, [searchTerm, selectedDepartment, selectedStaffType, tableData]);

  function handleIsCheckedClick(id: string) {
    const datum = tableData.find((datum) => datum.id === id);

    if (!datum) {
      console.error("Item not found");
      return;
    }

    const item = {
      is_enabled: !datum.is_enabled,
    };

    const updateStaffStatus = async () => {
      try {
        const promise = axios.patch(`${STAFF_ENDPOINT}${id}/`, item, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        run(promise);
      } catch (error) {
        console.error("handleIsCheckedClick error: ", error);
      }
    };

    updateStaffStatus();
  }

  async function addNewStaffHandler(data: StaffFormValues) {
    try {
      await run(axios.post(STAFF_ENDPOINT, data));
    } catch (err) {
      console.error("Failed to add staff:", err);
      throw err;
    }
  }

  return (
    <>
      <div className="grid gap-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-6">
          Staff Management
        </h1>

        {requestStatus.isPending ? (
          <div>Loading...</div>
        ) : requestStatus.isRejected ? (
          <div>Error: {error?.message || "Failed to fetch data"}</div>
        ) : (
          <>
            <FilterSection
              searchTerm={searchTerm}
              selectedDepartment={selectedDepartment}
              selectedStaffType={selectedStaffType}
              departments={departments as string[]}
              staffTypes={staffTypes as string[]}
              onSearchChange={setSearchTerm}
              onDepartmentChange={setSelectedDepartment}
              onStaffTypeChange={setSelectedStaffType}
              addNewStaffHandler={addNewStaffHandler}
            />

            <Table
              tableHeaderTitles={tableHeaders}
              tableBody={
                <StaffTable
                  tableBodyItems={filteredStaff}
                  shownHeaders={tableHeaders}
                  isCheckedHandler={handleIsCheckedClick}
                  tableBodyRowClassName="grid !gap-x-2 xl:!gap-x-4 text-xs border my-3 bg-[#FBFBFB] border-[#E7E7E7] border-opacity-50 rounded-[12px]"
                />
              }
              customTableClasses={{
                tableHeaderClassName: `${getGridColsClass(
                  tableHeaders.length
                )} text-[#454242] text-sm`,
              }}
            />
          </>
        )}
      </div>
      <Toaster />
    </>
  );
};

export { StaffManagementTable };
