import jwtDecode, { JwtPayload } from 'jwt-decode';

export type Token = {
  token: string;
  username: string;
} | null;

type LoggedInUser = {
  username: string;
  token: string;
};

export const setToken = (loggedInUser: LoggedInUser) => {
  window.localStorage.setItem(
    'user',
    JSON.stringify({
      ...loggedInUser,
      token: 'Bearer ' + loggedInUser.token,
    })
  );
};

export const getToken = () => {
  const user = window.localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user).token;
  }
  return null;
};

export const removeToken = () => {
  window.localStorage.removeItem('user');
};

export const tokenExpired = () => {
  const token = getToken();
  if (token === null) return true;

  const { exp } = jwtDecode<JwtPayload>(token);
  const now = new Date().getTime() / 1000;
  if (exp) {
    return now > exp;
  }
  return false;
};

export const getUser = () => {
  const user = window.localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
