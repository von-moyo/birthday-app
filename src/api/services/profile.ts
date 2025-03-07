/*
=================================
PROFILE SERVICES
=================================
*/

import { getRequest } from "../requestProcessor";
import { adminProfileURL } from "../urls/profile";


/**
 * admin profile service
 * @returns axios promise
 */

export const adminProfileService = () => {
  const request = {
    url: adminProfileURL(),
  };
  return getRequest(request);
};