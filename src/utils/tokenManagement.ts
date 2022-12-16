import jwtDecode, { JwtPayload } from 'jwt-decode';

export type Token = {
  token: string;
  username: string;
} | null;

type LoggedInUser = {
  username: string;
  token: string;
};

export const setUser = (loggedInUser: LoggedInUser) => {
  window.localStorage.setItem(
    'user',
    JSON.stringify({
      username: loggedInUser.username,
      token: 'Bearer ' + loggedInUser.token,
    })
  );
};

export const getUserName = () => {
  const user = window.localStorage.getItem('user');
  if (user) {
    return JSON.parse(user).username;
  }
  return null;
};

export const getToken = () => {
  const user = window.localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user).token;
  }
  return null;
};

export const removeUser = () => {
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
