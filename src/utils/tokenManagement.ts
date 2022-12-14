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
  if (user) {
    return JSON.parse(user).token;
  }
};

export const removeToken = () => {
  window.localStorage.removeItem('user');
};

export const getUser = () => {
  const user = window.localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
};
