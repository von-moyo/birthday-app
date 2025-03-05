/*
=================================
AUTH SERVICES
=================================
*/

import { axiosInstanceUnauth, postRequest } from "../requestProcessor";
import { loginURL, forgotPasswordURL, refreshTokenURL, ResetPasswordURL } from "../urls";

/**
 * login service
 * @returns axios promise
 */

export interface loginData {
  email: string;
  password: string;
}

export const loginService = (data: loginData) => {
  const request = {
    url: loginURL(),
    data
  };
  return postRequest(request);
};

/**
 * forgot password service
 * @returns axios promise
 */

export interface forgotPasswordData {
  email: string;
}

export const forgotPasswordService = (data: forgotPasswordData) => {
  const request = {
    url: forgotPasswordURL(),
    data
  };
  return postRequest(request);
};

/**
 * reset password service
 * @returns axios promise
 */

export interface resetPasswordData {
  uid: string;
  token: string;
  new_password: string;
}

export const resetPasswordService = (data: resetPasswordData) => {
  const request = {
    url: ResetPasswordURL(),
    data
  };
  return postRequest(request);
};


/**
 * refresh token service
 * @returns axios promise
 */

export interface refreshTokenData {
  refresh_token: string;
}

export const refreshTokenService = (data: refreshTokenData) => {
  // const request = {
  //   url: refreshTokenURL(data.refresh_token),
  //   data
  // };
  const apiKey = import.meta.env.VITE_API_KEY;
  return axiosInstanceUnauth.post(refreshTokenURL(data.refresh_token), data, {
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });
};  