import axios from 'axios';

const baseUrl = '/api/login';

type CredentialsProps = {
  username: string;
  password: string;
};

const login = async (credentials: CredentialsProps) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
