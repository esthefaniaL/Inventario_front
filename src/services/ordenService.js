// src/services/ordenService.js
import fetchData from './api';

const getOrdenes = () => fetchData('/ordenes');
const getOrdenById = (id) => fetchData(`/ordenes/${id}`);
const createOrden = (data) =>
  fetchData('/ordenes', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
      },
      
    body: JSON.stringify(data),
  });
const updateOrden = (id, data) =>
  fetchData(`/ordenes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
const deleteOrden = (id) =>
  fetchData(`/ordenes/${id}`, {
    method: 'DELETE',
  });

export default {
  getOrdenes,
  getOrdenById,
  createOrden,
  updateOrden,
  deleteOrden,
};
