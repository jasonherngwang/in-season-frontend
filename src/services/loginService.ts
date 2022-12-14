import { LOGIN_URL, USERS_URL } from '../constants';
import axios from 'axios';

type CredentialsProps = {
  username: string;
  password: string;
};

const login = async (credentials: CredentialsProps) => {
  const response = await axios.post(LOGIN_URL, credentials);
  return response.data;
};

const signup = async (credentials: CredentialsProps) => {
  const response = await axios.post(USERS_URL, credentials);
  return response.data;
};

export default { login, signup };
