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