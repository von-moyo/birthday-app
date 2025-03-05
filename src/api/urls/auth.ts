/*
=================================
AUTH URLS
=================================
*/

/**
 * Refresh Token URL
 *
 * @returns url string
 *
 */

export const loginURL = () => `/auth/login/`;

/**
 * Forgot Password URL
 *
 * @returns url string
 *
 */

export const forgotPasswordURL = () => `/auth/forgot-password/`;

/**
 * Reset Password URL
 *
 * @returns url string
 *
 */

export const ResetPasswordURL = () => `/auth/reset-password/`;

/**
 * Refresh Token URL
 *
 * @returns url string
 *
 */ 

export const refreshTokenURL = (refresh_token: string) => `/auth/refresh/${refresh_token}`;