import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useApiRequest } from "../../hooks";
import { Table } from "../table";
import { StaffDB, StaffFormValues } from "../../types";
import { StaffTable, TableBodyItem } from "./staff-table";
import { FilterSection } from "./filter-section";
import { getGridColsClass } from "./utils";
import {
  patchRequest,
  getRequest,
  deleteRequest,
} from "@/api/requestProcessor";
import { toast } from "sonner";

const STAFF_ENDPOINT = "https://hameedah.pythonanywhere.com/api/admin/staff/";

const StaffManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedStaffType, setSelectedStaffType] = useState<string>("");
  const [filteredStaff, setFilteredStaff] = useState<TableBodyItem[]>([]);

  const tableHeaders = [
    { index: 0, title: "🔔", key: "is_enabled" },
    { index: 1, title: "Name", key: "name" },
    { index: 2, title: "Department", key: "department" },
    { index: 3, title: "Date of Birth", key: "date_of_birth" },
    { index: 4, title: "Email", key: "email" },
    { index: 5, title: "Actions", key: "actions" },
  ];

  const { data, error, run, requestStatus } = useApiRequest({});

  useEffect(() => {
    const fetchData = async () => {
      run(
        getRequest({
          url: `${STAFF_ENDPOINT}?format=json`,
        })
      );
    };

    fetchData();
  }, [run]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const tableData: TableBodyItem[] = useMemo(() => {
    if (!Array.isArray(data?.data)) {
      console.warn("Expected an array but got:", data?.data, "\n");
      return [];
    }

    if (data?.status === 200) {
      return (data?.data || []).map((member: StaffDB) => ({
        ...member,
        name: `${member.first_name} ${member.last_name}`,
      }));
    }
    return [];
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
        await run(
          patchRequest({
            url: `${STAFF_ENDPOINT}${id}/`,
            data: item,
          })
        );

        await run(
          getRequest({
            url: `${STAFF_ENDPOINT}?format=json`,
          })
        );
      } catch (error) {
        console.error("handleIsCheckedClick error: ", error);
        toast.error("Failed to update staff status");
      }
    };

    updateStaffStatus();
  }

  function editStaffHandler(data: Partial<StaffDB>) {
    const id = data.id;
    if (!id) {
      toast.error("Staff doesn't exist!");
    }

    const editStaff = async () => {
      try {
        await run(
          patchRequest({
            url: `${STAFF_ENDPOINT}${id}/`,
            data,
          })
        );

        await run(
          getRequest({
            url: `${STAFF_ENDPOINT}?format=json`,
          })
        );
        toast.success("Edited successfully!");
      } catch (error) {
        console.error("Edited staff error: ", error);
        toast.error("Failed to edit staff data");
      }
    };

    editStaff();
  }

  function deleteStaffHandler(id: string) {
    const deleteStaffStatus = async () => {
      try {
        await run(
          deleteRequest({
            url: `${STAFF_ENDPOINT}${id}/`,
          })
        );

        await run(
          getRequest({
            url: `${STAFF_ENDPOINT}?format=json`,
          })
        );
        toast.success("Deleted successfully!");
      } catch (error) {
        console.error("delete staff error: ", error);
        toast.error("Failed to delete staff");
      }
    };

    deleteStaffStatus();
  }

  function customizeMessageHandler(id: string) {
    toast.info("Hi! This doesn't work yet!");
    console.log(`Customize message triggered for user with id: ${id}`);
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
                editStaffHandler={editStaffHandler}
                deleteStaffHandler={deleteStaffHandler}
                customizeMessageHandler={customizeMessageHandler}
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
  );
};

export { StaffManagementTable };
