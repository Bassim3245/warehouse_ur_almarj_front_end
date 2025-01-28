import Cookies from "js-cookie";
/**
 * Sets the access token and refresh token in cookies with configurable expiration.
 * @param {string} accessToken - The access token.
 * @param {string} refreshToken - The refresh token.
 */
export const setToken = (accessToken, refreshToken) => {
  Cookies.set("authToken", accessToken, { expires: 1 }); 
  Cookies.set("refreshToken", refreshToken, { expires: 365 * 10 }); // Set refresh token to expire in 10 years
};
/**
 * Retrieves the access token from cookies.
 * @returns {string | undefined} - The access token, or undefined if not set.
 */
export const getToken = () => {
  return Cookies.get("authToken");
};
/**
 * Retrieves the refresh token from cookies.
 * @returns {string | undefined} - The refresh token, or undefined if not set.
 */
export const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};
/**
 * Removes the access token and refresh token from cookies.
 */
export const removeToken = () => {
  Cookies.remove("authToken");
  Cookies.remove("refreshToken");
};
