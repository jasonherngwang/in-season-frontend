import axios from 'axios';

const baseUrl = '/api/foods';

// let token = null

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`
// }

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// const create = async (newObj) => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newObj, config)
//   return response.data
// }

// const update = async (newObj) => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj, config)
//   return response.data
// }

// const deleteBlog = async (id) => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.delete(`${baseUrl}/${id}`, config)
//   return response.data
// }

// export default { getAll, create, update, deleteBlog, setToken };
export default { getAll };
