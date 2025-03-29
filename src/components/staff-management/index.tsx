import { useState, useEffect, useMemo } from "react";
import { useApiRequest, usePagination } from "../../hooks";
import { Table } from "../table";
import { StaffDB, StaffFormValues } from "../../types";
import { StaffTable, TableBodyItem } from "./staff-table";
import { FilterSection } from "./filter-section";
import {
  patchRequest,
  getRequest,
  deleteRequest,
  postRequest,
} from "@/api/requestProcessor";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Pagination } from "../pagination";

const STAFF_ENDPOINT = "https://hameedah.pythonanywhere.com/api/admin/staff/";

const StaffManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedStaffType, setSelectedStaffType] = useState<string>("");
  const [filteredStaff, setFilteredStaff] = useState<TableBodyItem[]>([]);

  const {
    paginatedList,
    handleNextPage,
    handlePrevPage,
    handleGoToPage,
    currentPage,
    totalPages,
  } = usePagination(filteredStaff, 7);

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
      } catch {
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
      } catch {
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
      } catch {
        toast.error("Failed to delete staff");
      }
    };

    deleteStaffStatus();
  }

  function addNewStaffHandler(data: StaffFormValues) {
    const addNewStaff = async () => {
      try {
        await run(
          postRequest({
            url: STAFF_ENDPOINT,
            data,
          })
        );

        await run(
          getRequest({
            url: `${STAFF_ENDPOINT}?format=json`,
          })
        );

        toast.success("Staff added successfully!");
      } catch {
        toast.error("Failed to add new staff");
      }
    };

    addNewStaff();
  }

  if (requestStatus.isPending) {
    return (
      <div className="flex justify-center items-center sm:h-[calc(100vh-94px)] h-[calc(100vh-69px)] w-full">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 sm:mt-6">
        Staff Management
      </h1>

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

        <div className="overflow-x-auto">
          <div className="min-w-xl">
            <Table
              tableHeaderTitles={tableHeaders}
              tableBody={
                <StaffTable
                  tableBodyItems={paginatedList}
                  shownHeaders={tableHeaders}
                  isCheckedHandler={handleIsCheckedClick}
                  editStaffHandler={editStaffHandler}
                  deleteStaffHandler={deleteStaffHandler}
                  tableBodyRowClassName="grid text-xs border my-3 bg-[#FBFBFB] border-[#E7E7E7] border-opacity-50 rounded-[12px] gap-2 pl-3"
                />
              }
              customTableClasses={{
                tableContainerClassName: "",
                tableHeaderClassName: `!grid-cols-[0.2fr_1fr_1fr_1fr_1fr_0.5fr] sm:!grid-cols-[0.2fr_1fr_1fr_1fr_1fr_1fr] text-[#454242] text-sm !px-0 !sm:px-0 !pl-3`,
                headerStyle: "!first:text-center first:justify-center",
              }}
            />
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handleGoToPage={handleGoToPage}
        />
      </>
    </div>
  );
};

export { StaffManagementTable };
