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
