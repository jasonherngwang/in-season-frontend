import axios from 'axios';

const baseUrl = '/api/login';

type CredentialsProps = {
  username: string;
  password: string;
};

export type Token = {
  token: string;
  username: string;
} | null;

let token = null;

const setToken = (newToken: Token) => {
  token = `Bearer ${newToken}`;
};

const login = async (credentials: CredentialsProps) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login, setToken };
