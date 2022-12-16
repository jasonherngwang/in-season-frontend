import { BASKET_URL } from '../constants';
import axios from 'axios';

import { getToken } from '../utils/tokenManagement';

const addFood = async (foodId: string) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    const response = await axios.patch(
      `${BASKET_URL}/add`,
      { food: foodId },
      config
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const deleteFood = async (foodId: string) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    const response = await axios.patch(
      `${BASKET_URL}/delete`,
      { food: foodId },
      config
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default {
  addFood,
  deleteFood,
};
