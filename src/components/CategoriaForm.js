// src/components/CategoriaForm.js
import React, { useState, useEffect } from 'react';
import categoriaService from '../services/categoriaService';

const CategoriaForm = ({ categoria, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
    }
  }, [categoria]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await categoriaService.updateCategoria(formData.id, formData);
      } else {
        await categoriaService.createCategoria(formData);
      }
      onSave(); // Refresca la lista de categorías o cierra el formulario
    } catch (error) {
      console.error('Error al guardar la categoría', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre de la Categoría"
        required
      />
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <button type="submit">Guardar Categoría</button>
    </form>
  );
};

export default CategoriaForm;
