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

const getTrialUserData = async () => {
  try {
    console.log(USERS_URL);
    const response = await axios.get(`${USERS_URL}/trial`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const deleteUser = async () => {
  const config = {
    headers: { Authorization: getToken() },
  };

  await axios.delete(`${USERS_URL}`, config);
};

export default {
  getUserData,
  getTrialUserData,
  deleteUser,
};
