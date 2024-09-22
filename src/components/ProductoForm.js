// src/components/ProductoForm.js
import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import empresaService from '../services/empresaService';

const ProductoForm = ({ producto, onSave }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    caracteristicas: '',
    precio: 0,
    empresaId: '',
  });
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await empresaService.getEmpresas();
        setEmpresas(response);
      } catch (error) {
        console.error('Error al obtener las empresas', error);
      }
    };
    fetchEmpresas();
    if (producto) {
      setFormData(producto);
    }
  }, [producto]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.codigo) {
        await productoService.updateProducto(formData.codigo, formData);
      } else {
        await productoService.createProducto(formData);
      }
      onSave(); // Llama a la función para refrescar la lista de productos o cerrar el formulario
    } catch (error) {
      console.error('Error al guardar el producto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="codigo"
        value={formData.codigo}
        onChange={handleChange}
        placeholder="Código"
        required
      />
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <textarea
        name="caracteristicas"
        value={formData.caracteristicas}
        onChange={handleChange}
        placeholder="Características"
        required
      />
      <input
        type="number"
        name="precio"
        value={formData.precio}
        onChange={handleChange}
        placeholder="Precio"
        required
      />
      <select
        name="empresaId"
        value={formData.empresaId}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione una empresa</option>
        {empresas.map((empresa) => (
          <option key={empresa.nit} value={empresa.nit}>
            {empresa.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Guardar Producto</button>
    </form>
  );
};

export default ProductoForm;
