export interface Employee {
  id?: string;
  name: string;
  department: string;
  date_of_birth: string;
  email: string;
  created_at?: string;
  image?: string;
}

export interface User {
  id: string;
  email: string;
  is_admin: boolean;
}

export type DepartmentType =
  | "botany"
  | "computer_science"
  | "chemistry"
  | "cell_biology_and_genetics"
  | "marine_sciences"
  | "mathematics"
  | "microbiology"
  | "physics"
  | "statistics"
  | "zoology";

export type StaffType = "academic" | "non_academic";

export type NotificationType = "email" | "phone_number";

export interface Staff {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department?: DepartmentType;
  staff_type?: StaffType;
  date_of_birth: string;
  profile_image_url?: string;
  notification_type?: NotificationType;
  is_enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type StaffFormValues = Omit<Staff, "id" | "created_at" | "updated_at">;
