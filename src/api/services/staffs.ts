/*
=================================
STAFFS SERVICES
=================================
*/

import { getRequest } from "../requestProcessor";
import { staffsURL } from "../urls/staff";


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