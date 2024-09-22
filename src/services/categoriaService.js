// src/services/categoriaService.js
import fetchData from './api';

const getCategorias = () => fetchData('/categorias');
const getCategoriaById = (id) => fetchData(`/categorias/${id}`);
const createCategoria = (data) =>
  fetchData('/categorias', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
      },
      
    body: JSON.stringify(data),
  });
const updateCategoria = (id, data) =>
  fetchData(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
const deleteCategoria = (id) =>
  fetchData(`/categorias/${id}`, {
    method: 'DELETE',
  });

export default {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
