import React from "react";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import {
  DepartmentType,
  StaffType,
  NotificationType,
  StaffFormValues,
  StaffDB,
} from "@/types";
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
import { Check, ChevronsUpDown } from "lucide-react";

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

export type StaffDialogMode = "create" | "update";

interface StaffDialogProps {
  mode: StaffDialogMode;
  initialValues?: Partial<StaffFormValues>;
  onSubmit: (data: StaffFormValues | StaffDB) => void | Promise<void>;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}

export default function StaffDialog({
  mode = "create",
  initialValues,
  onSubmit,
  trigger,
  title = mode === "create" ? "Add New Staff" : "Edit Staff Member",
  description = mode === "create"
    ? "Add new staff members to the system by entering their personal and professional information."
    : "Update staff member information in the system.",
}: StaffDialogProps) {
  const [open, setOpen] = React.useState(false);

  const defaultValues = React.useMemo(
    () => ({
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
      ...initialValues,
    }),
    [initialValues]
  );

  const form = useForm<StaffFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, form, defaultValues]);

  const handleFormSubmit: SubmitHandler<StaffFormValues> = async (data) => {
    try {
      await onSubmit(data);

      const successMessage =
        mode === "create"
          ? "Staff member added successfully."
          : "Staff member updated successfully.";

      toast.success(successMessage);
      form.reset();
      setOpen(false);
    } catch (error) {
      const errorMessage =
        mode === "create"
          ? "Failed to add staff. Please try again."
          : "Failed to update staff. Please try again.";

      toast.error(errorMessage);
    }
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
        alert("Something went wrong, please pick another image");
        form.setValue("profile_image_url", "");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {trigger ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[640px] bg-white">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="z-50 grid gap-4 sm:p-4 max-h-[60vh] overflow-y-auto">
                {/* Personal Information */}
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel
                        htmlFor="first_name"
                        className="pt-2 text-right"
                      >
                        <span className="text-nowrap sm:text-base text-sm">First Name</span>
                        <sup className="text-red-700">*</sup>
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            id="first_name"
                            className="sm:text-base text-sm" placeholder="John"
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
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel
                        htmlFor="last_name"
                        className="pt-2 text-right"
                      >
                        <span className="text-nowrap sm:text-base text-sm">Last Name</span>
                        <sup className="text-red-700">*</sup>
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input id="last_name" className="sm:text-base text-sm" placeholder="Doe" {...field} />
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
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel htmlFor="email" className="pt-2 text-right">
                        <span className="text-nowrap sm:text-base text-sm">Email</span>
                        <sup className="text-red-700">*</sup>
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            className="sm:text-base text-sm" placeholder="john.doe@example.com"
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
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel
                        htmlFor="phone_number"
                        className="pt-2 text-right"
                      >
                        <span className="text-nowrap sm:text-base text-sm">Phone</span>
                        <sup className="text-red-700">*</sup>
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            id="phone_number"
                            className="sm:text-base text-sm" placeholder="08034536923"
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
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel
                        htmlFor="date_of_birth"
                        className="pt-2 text-right"
                      >
                        <span className="text-nowrap sm:text-base text-sm">Date of Birth</span>
                        <sup className="text-red-700">*</sup>
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            id="date_of_birth"
                            type="date"
                            className="sm:text-base text-sm" placeholder="YYYY-MM-DD"
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
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel className="text-right pt-2 sm:text-base text-sm">Department</FormLabel>
                      <div className="col-span-3 cursor-pointer">
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
                                <CommandInput className="sm:text-base text-sm" placeholder="Search department..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No department found.
                                  </CommandEmpty>
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
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel className="text-right pt-2 sm:text-base text-sm">Staff Type</FormLabel>
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
                                <CommandInput className="sm:text-base text-sm" placeholder="Search staff type..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No staff type found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {staffTypeOptions.map((type) => (
                                      <CommandItem
                                        key={type.value}
                                        value={type.value}
                                        onSelect={() =>
                                          field.onChange(type.value)
                                        }
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
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel className="text-right pt-2 sm:text-base text-sm">Notification</FormLabel>
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
                                <CommandInput className="sm:text-base text-sm" placeholder="Search notification type..." />
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
                    <FormItem className=" items-start sm:!gap-4">
                      <FormLabel
                        htmlFor="profile_image"
                        className="pt-2 text-right sm:text-base text-sm"
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
                    <FormItem className="flex flex-row-reverse justify-end items-center mt-4 sm:!gap-3">
                      <FormLabel htmlFor="is_enabled">
                        Enable notifications?
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Checkbox
                            id="is_enabled"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="cursor-pointer"
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
                onClick={form.handleSubmit(handleFormSubmit)}
              >
                {mode === "create" ? "Add Staff" : "Update Staff"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="z-50 grid sm:gap-4 gap-2 sm:p-4 max-h-[60vh] overflow-y-auto scrollbar-none">
              {/* Personal Information */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel htmlFor="first_name" className="pt-2 text-right">
                      <span className="text-nowrap sm:text-base text-sm">First Name</span>
                      <sup className="text-red-700">*</sup>
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input id="first_name" className="sm:text-base text-sm" placeholder="John" {...field} />
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
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel htmlFor="last_name" className="pt-2 text-right">
                      <span className="text-nowrap sm:text-base text-sm">Last Name</span>
                      <sup className="text-red-700">*</sup>
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input id="last_name" className="sm:text-base text-sm" placeholder="Doe" {...field} />
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
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel htmlFor="email" className="pt-2 text-right">
                      <span className="text-nowrap sm:text-base text-sm">Email</span>
                      <sup className="text-red-700">*</sup>
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          className="sm:text-base text-sm" placeholder="john.doe@example.com"
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
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel
                      htmlFor="phone_number"
                      className="pt-2 text-right"
                    >
                      <span className="text-nowrap sm:text-base text-sm">Phone</span>
                      <sup className="text-red-700">*</sup>
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          id="phone_number"
                          className="sm:text-base text-sm" placeholder="08034536923"
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
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel
                      htmlFor="date_of_birth"
                      className="pt-2 text-right"
                    >
                      <span className="text-nowrap sm:text-base text-sm">Date of Birth</span>
                      <sup className="text-red-700">*</sup>
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          id="date_of_birth"
                          type="date"
                          className="sm:text-base text-sm" placeholder="YYYY-MM-DD"
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
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel className="text-right pt-2">Department</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between cursor-pointer"
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
                              <CommandInput className="sm:text-base text-sm" placeholder="Search department..." />
                              <CommandList>
                                <CommandEmpty>
                                  No department found.
                                </CommandEmpty>
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
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel className="text-right pt-2">Staff Type</FormLabel>
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
                              <CommandInput className="sm:text-base text-sm" placeholder="Search staff type..." />
                              <CommandList>
                                <CommandEmpty>
                                  No staff type found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {staffTypeOptions.map((type) => (
                                    <CommandItem
                                      key={type.value}
                                      value={type.value}
                                      onSelect={() =>
                                        field.onChange(type.value)
                                      }
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
                  <FormItem className=" items-start sm:!gap-4">
                    <FormLabel className="text-right pt-2">Notification</FormLabel>
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
                              <CommandInput className="sm:text-base text-sm" placeholder="Search notification type..." />
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
                  <FormItem className=" items-start sm:!gap-4">
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
                  <FormItem className="flex items-center flex-row-reverse justify-end mt-4 sm:!gap-3">
                    <FormLabel htmlFor="is_enabled">
                      Enable notifications?
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Checkbox
                          id="is_enabled"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className=" cursor-pointer"
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
              onClick={form.handleSubmit(handleFormSubmit)}
            >
              {mode === "create" ? "Add Staff" : "Update Staff"}
            </Button>
          </DialogFooter>
        </>
      )}
    </>
  );
}
