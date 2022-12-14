import { FOODS_URL } from '../constants';
import axios from 'axios';

import { Food } from '../types';
import { getToken } from '../utils/tokenManagement';

const getAll = async () => {
  const response = await axios.get(FOODS_URL);
  return response.data;
};

const getOne = async (id: string) => {
  const response = await axios.get(`${FOODS_URL}/${id}`);
  return response.data;
};

const create = async (newFood: Food) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    const response = await axios.post(
      `${FOODS_URL}/${newFood.id}`,
      newFood,
      config
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const update = async (updatedFood: Food) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    const response = await axios.put(
      `${FOODS_URL}/${updatedFood.id}`,
      updatedFood,
      config
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const deleteFood = async (id: string) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    await axios.delete(`${FOODS_URL}/${id}`, config);
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteFood,
};
