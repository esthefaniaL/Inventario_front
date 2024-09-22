// src/services/empresaService.js
import fetchData from './api';

const getEmpresas = () => fetchData('/empresas');
const getEmpresaById = (id) => fetchData(`/empresas/${id}`);
const createEmpresa = (data) =>
  fetchData('/empresas', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
      },
      
    body: JSON.stringify(data),
  });
const updateEmpresa = (id, data) =>
  fetchData(`/empresas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
const deleteEmpresa = (id) =>
  fetchData(`/empresas/${id}`, {
    method: 'DELETE',
  });

export default {
  getEmpresas,
  getEmpresaById,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
};
