export interface Staff {
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

export interface StaffResponse {
  id: string; // UUID
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string; // Must match 11-digit pattern
  department?: string; // Optional, since it's not marked required
  staff_type?: string; // Optional
  date_of_birth: string; // Date string
  profile_image_url?: string; // Optional, may be empty
  notification_type?: string; // Optional
  is_enabled: boolean;
  created_at?: string; // Read-only timestamp
  updated_at?: string; // Read-only timestamp
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

export interface StaffDB {
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

export type StaffFormValues = Omit<StaffDB, "id" | "created_at" | "updated_at">;
