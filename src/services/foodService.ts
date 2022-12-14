import axios from 'axios';

import { Food } from '../types';
import { setToken, getToken, removeToken } from '../utils/tokenManagement';

const baseUrl = '/api/foods';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newFood: Food) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/${newFood.id}`,
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
      `${baseUrl}/${updatedFood.id}`,
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
    await axios.delete(`${baseUrl}/${id}`, config);
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
