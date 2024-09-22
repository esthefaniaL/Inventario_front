// src/pages/CategoriasPage.js
import React, { useState, useEffect } from 'react';
import categoriaService from '../services/categoriaService';
import CategoriaForm from '../components/CategoriaForm';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await categoriaService.getCategorias();
        setCategorias(response);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSave = () => {
    setSelectedCategoria(null); // Resetea el formulario después de guardar
    const fetchCategorias = async () => {
      try {
        const response = await categoriaService.getCategorias();
        setCategorias(response);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };
    fetchCategorias();
  };

  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria);
  };

  const handleDelete = async (id) => {
    try {
      await categoriaService.deleteCategoria(id);
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
    } catch (error) {
      console.error('Error al eliminar categoría', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Categorías</h1>
      <CategoriaForm categoria={selectedCategoria} onSave={handleSave} />
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.nombre}
            <button onClick={() => handleEdit(categoria)}>Editar</button>
            <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriasPage;
