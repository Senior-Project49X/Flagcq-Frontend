

import Cookies from 'js-cookie';

// Set a cookie
export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value, {  secure: true});
};

// Get a cookie
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// Remove a cookie
export const removeCookie = (key: string) => {
  Cookies.remove(key);
};

export const isHasCookie =(key: string): boolean =>{
  return Cookies.get(key) !== undefined;
}