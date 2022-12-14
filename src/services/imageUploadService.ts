import axios from 'axios';

import { setToken, getToken, removeToken } from '../utils/tokenManagement';

const baseUrl = '/api/foods';

// const getAll = async () => {
//   const response = await axios.get(baseUrl);
//   return response.data;
// };

// const getOne = async (id: string) => {
//   const response = await axios.get(`${baseUrl}/${id}`);
//   return response.data;
// };

const upload = async (file: any) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  try {
    console.log(file, config);
    const response = await axios.post(`${baseUrl}/upload`, file, config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// const update = async (updatedFood: Food) => {
//   const config = {
//     headers: { Authorization: getToken() },
//   };

//   try {
//     const response = await axios.put(
//       `${baseUrl}/${updatedFood.id}`,
//       updatedFood,
//       config
//     );
//     return response.data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//   }
// };

// const deleteBlog = async (id) => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.delete(`${baseUrl}/${id}`, config)
//   return response.data
// }

export default {
  upload,
};