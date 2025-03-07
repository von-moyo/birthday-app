/*
=================================
STAFFS SERVICES
=================================
*/

import { getRequest, patchRequest } from "../requestProcessor";
import { staffsURL, staffUpdateURL } from "../urls/staff";


/**
 * staffs service
 * @returns axios promise
 */

export interface StaffsData {
  search?: string;
  department?: 'botany' | 'computer_science' | 'chemistry' | 'cell_biology_and_genetics' | 'marine_sciences' | 'mathematics' | 'microbiology' | 'physics' | 'statistics' | 'zoology';
  search_type?: 'academic' | 'non_academic';
  birth_month?: number;
}

export const staffsService = (data?: StaffsData) => {
  const request = {
    url: staffsURL(),
    config: {
      params: data,
      paramsSerializer: (params: any) => {
        const query = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          if (Array.isArray(params[key])) {
            params[key].forEach((item) => query.append(key, item));
          } else {
            query.append(key, params[key]);
          }
        });
        return query.toString();
      },
    },
  };
  return getRequest(request);
};

/**
 * staffs update service
 * @returns axios promise
 */

export interface StaffUpdateData {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  department?: 'botany' | 'computer_science' | 'chemistry' | 'cell_biology_and_genetics' | 'marine_sciences' | 'mathematics' | 'microbiology' | 'physics' | 'statistics' | 'zoology';
  staff_type?: 'academic' | 'non_academic';
  date_of_birth?: string;
  profile_image_url?: string;
  notification_type?: 'email' | 'sms';
  is_enabled?: boolean;
  user?: string | null;
}

export const staffUpdateService = (data: StaffUpdateData) => {
  const request = {
    url: staffUpdateURL(data.id),
    data
  };
  return patchRequest(request);
};

/**
 * fetch single staff service
 * @returns axios promise
 */

export const fetchStaffService = (staffID: string) => {
  const request = {
    url: staffUpdateURL(staffID),
  };
  return getRequest(request);
};