// src/pages/ProductosPage.js
import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import ProductoForm from '../components/ProductoForm';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await productoService.getProductos();
        setProductos(response);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };
    fetchProductos();
  }, []);

  const handleSave = () => {
    setSelectedProducto(null); // Resetea el formulario después de guardar
    const fetchProductos = async () => {
      try {
        const response = await productoService.getProductos();
        setProductos(response);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };
    fetchProductos();
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
  };

  const handleDelete = async (codigo) => {
    try {
      await productoService.deleteProducto(codigo);
      setProductos(productos.filter((producto) => producto.codigo !== codigo));
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <ProductoForm producto={selectedProducto} onSave={handleSave} />
      <ul>
        {productos.map((producto) => (
          <li key={producto.codigo}>
            {producto.nombre}
            <button onClick={() => handleEdit(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.codigo)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosPage;
