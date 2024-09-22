// src/services/clienteService.js
import fetchData from './api';

const getClientes = () => fetchData('/clientes');
const getClienteById = (id) => fetchData(`/clientes/${id}`);
const createCliente = (data) =>
  fetchData('/clientes', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
      },
      
    body: JSON.stringify(data),
  });
const updateCliente = (id, data) =>
  fetchData(`/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
const deleteCliente = (id) =>
  fetchData(`/clientes/${id}`, {
    method: 'DELETE',
  });

export default {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
