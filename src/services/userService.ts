import { USERS_URL } from '../constants';
import axios from 'axios';

import { getToken } from '../utils/tokenManagement';

const getUserData = async () => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    const response = await axios.get(`${USERS_URL}`, config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default {
  getUserData,
};
