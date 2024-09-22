// src/services/api.js
const BASE_URL = 'http://localhost:8080/api';

const fetchData = async (endpoint, options = {}) => {
  //const token = localStorage.getItem('token');
 /* const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };*/
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
      //mode:'no-cors',
    headers: {
       'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    throw new Error('Error en la solicitud');
  }
  return response.json();
};

export default fetchData;
