import React from "react";
import { Search, Filter } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatDepartment } from "./utils";
import { cn } from "@/lib/utils";
import {
  StaffFormValues,
  DepartmentType,
  StaffType,
  NotificationType,
} from "@/types";

const departmentOptions = [
  { value: "botany", label: "Botany" },
  { value: "computer_science", label: "Computer Science" },
  { value: "chemistry", label: "Chemistry" },
  { value: "cell_biology_and_genetics", label: "Cell Biology and Genetics" },
  { value: "marine_sciences", label: "Marine Sciences" },
  { value: "mathematics", label: "Mathematics" },
  { value: "microbiology", label: "Microbiology" },
  { value: "physics", label: "Physics" },
  { value: "statistics", label: "Statistics" },
  { value: "zoology", label: "Zoology" },
];

const staffTypeOptions = [
  { value: "academic", label: "Academic" },
  { value: "non_academic", label: "Non-Academic" },
];

const notificationOptions = [
  { value: "email", label: "Email" },
  { value: "phone_number", label: "Phone Number" },
];

const supportedImageTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .max(254, "Email must be at most 254 characters"),
  phone_number: yup
    .string()
    .matches(/^\d{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
  date_of_birth: yup
    .string()
    .required("Date of birth is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in YYYY-MM-DD format"
    ),
  department: yup
    .string()
    .optional()
    .oneOf(
      [
        "botany",
        "computer_science",
        "chemistry",
        "cell_biology_and_genetics",
        "marine_sciences",
        "mathematics",
        "microbiology",
        "physics",
        "statistics",
        "zoology",
      ] as DepartmentType[],
      "Invalid department"
    ) as yup.Schema<DepartmentType | undefined>,
  staff_type: yup
    .string()
    .optional()
    .oneOf(
      ["academic", "non_academic"] as StaffType[],
      "Invalid staff type"
    ) as yup.Schema<StaffType | undefined>,
  notification_type: yup
    .string()
    .optional()
    .oneOf(
      ["email", "phone_number"] as NotificationType[],
      "Invalid notification type"
    ) as yup.Schema<NotificationType | undefined>,
  profile_image_url: yup
    .string()
    .optional()
    .test("is-base64", "Invalid image format", (value) => {
      if (!value) return true; // Allow empty values (nullable)
      // Check if the value is a valid base64 data URL
      const regex = new RegExp(
        `^data:(${supportedImageTypes.join("|")});base64,`
      );
      return regex.test(value);
    }),
  is_enabled: yup.boolean().optional(),
});

function AddStaffDialog({
  addNewStaffHandler,
}: {
  addNewStaffHandler: (data: StaffFormValues) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<StaffFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      department: undefined,
      staff_type: undefined,
      notification_type: undefined,
      profile_image_url: "",
      is_enabled: undefined,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<StaffFormValues> = (data) => {
    try {
      addNewStaffHandler(data);
      toast.success("Staff member added successfully.");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding staff:", error);
      toast.error("Failed to add staff. Please try again.");
    }
    console.log("Form data submitted:", data);
  };

  const handleCancel = () => {
    form.reset(); // Clear form
    setOpen(false); // Close dialog
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer, mimeType: string) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return `data:${mimeType};base64,${btoa(binary)}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        const base64String = arrayBufferToBase64(reader.result, file.type);
        form.setValue("profile_image_url", base64String);
      } else if (typeof reader.result === "string") {
        form.setValue("profile_image_url", reader.result);
      } else {
        console.error("Unexpected FileReader result", reader.result);
        alert("Something went wrong, please pick another image");
        form.setValue("profile_image_url", "");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="py-2 px-4 text-sm font-medium text-white border border-gray-300 rounded-lg cursor-pointer bg-green-600"
        >
          Add New Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
          <DialogDescription>
            Add new staff members to the system by entering their personal and
            professional information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="z-50 grid gap-4 p-4 max-h-[60vh] overflow-y-auto">
            {/* Personal Information */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel htmlFor="first_name" className="pt-2 text-right">
                    <span>First Name</span>
                    <sup className="text-red-700">*</sup>
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input id="first_name" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel htmlFor="last_name" className="pt-2 text-right">
                    <span>Last Name</span>
                    <sup className="text-red-700">*</sup>
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input id="last_name" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel htmlFor="email" className="pt-2 text-right">
                    <span>Email</span>
                    <sup className="text-red-700">*</sup>
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel htmlFor="phone_number" className="pt-2 text-right">
                    <span>Phone</span>
                    <sup className="text-red-700">*</sup>
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        id="phone_number"
                        placeholder="08034536923"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel
                    htmlFor="date_of_birth"
                    className="pt-2 text-right"
                  >
                    <span>Date of Birth</span>
                    <sup className="text-red-700">*</sup>
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        id="date_of_birth"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            {/* Department Combobox */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel className="text-right">Department</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? departmentOptions.find(
                                  (dept) => dept.value === field.value
                                )?.label
                              : "Select department..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white z-[1000] w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search department..." />
                            <CommandList>
                              <CommandEmpty>No department found.</CommandEmpty>
                              <CommandGroup>
                                {departmentOptions.map((dept) => (
                                  <CommandItem
                                    key={dept.value}
                                    value={dept.value}
                                    onSelect={() => {
                                      field.onChange(dept.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === dept.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {dept.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            {/* Staff Type Combobox */}
            <FormField
              control={form.control}
              name="staff_type"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel className="text-right">Staff Type</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? staffTypeOptions.find(
                                  (type) => type.value === field.value
                                )?.label
                              : "Select staff type..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white z-[1000] w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search staff type..." />
                            <CommandList>
                              <CommandEmpty>No staff type found.</CommandEmpty>
                              <CommandGroup>
                                {staffTypeOptions.map((type) => (
                                  <CommandItem
                                    key={type.value}
                                    value={type.value}
                                    onSelect={() => field.onChange(type.value)}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === type.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {type.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            {/* Notification Type Combobox */}
            <FormField
              name="notification_type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel className="text-right">Notification</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? notificationOptions.find(
                                  (option) => option.value === field.value
                                )?.label
                              : "Select notification type..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white z-[1000] w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search notification type..." />
                            <CommandList>
                              <CommandEmpty>
                                No notification type found.
                              </CommandEmpty>
                              <CommandGroup>
                                {notificationOptions.map((option) => (
                                  <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => {
                                      field.onChange(option.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === option.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {option.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profile_image_url"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel
                    htmlFor="profile_image"
                    className="pt-2 text-right"
                  >
                    Profile Image
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        {...field}
                        id="profile_image"
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={handleImageUpload}
                        value={undefined}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_enabled"
              render={({ field }) => (
                <FormItem className="grid-cols-4 items-start !gap-4">
                  <FormLabel htmlFor="is_enabled">
                    Enable notifications?
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Checkbox
                        id="is_enabled"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700 mt-1" />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="flex items-center gap-x-4">
          <Button
            type="button"
            className="bg-red-700 text-white hover:cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="hover:cursor-pointer"
            onClick={form.handleSubmit(onSubmit)}
          >
            Add Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FilterSectionProps {
  searchTerm: string;
  selectedDepartment: string;
  selectedStaffType: string;
  departments: string[];
  staffTypes: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStaffTypeChange: (value: string) => void;
  addNewStaffHandler: (data: StaffFormValues) => void;
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
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        {/* Search by name */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter by department */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter size={16} className="text-gray-400" />
          </div>
          <select
            className="py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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

        {/* Filter by staff type */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter size={16} className="text-gray-400" />
          </div>
          <select
            className="py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
      </div>
      <AddStaffDialog addNewStaffHandler={addNewStaffHandler} />
    </div>
  );
};
