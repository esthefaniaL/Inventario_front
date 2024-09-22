// src/services/productoService.js
import fetchData from './api';

const getProductos = () => fetchData('/productos');
const getProductoById = (id) => fetchData(`/productos/${id}`);
const createProducto = (data) =>
  fetchData('/productos', {
    method: 'POST',
    headers:{
    'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(data),
  });
const updateProducto = (id, data) =>
  fetchData(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
const deleteProducto = (id) =>
  fetchData(`/productos/${id}`, {
    method: 'DELETE',
  });

export default {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
