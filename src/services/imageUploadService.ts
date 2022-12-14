import { FOODS_URL } from '../constants';
import axios from 'axios';

import { getToken } from '../utils/tokenManagement';

const upload = async (file: any) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    console.log(file, config);
    const response = await axios.post(`${FOODS_URL}/upload`, file, config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default {
  upload,
};
