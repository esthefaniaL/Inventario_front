// src/pages/OrdenesPage.js
import React, { useState, useEffect } from 'react';
import ordenService from '../services/ordenService';
import OrdenForm from '../components/OrdenForm';

const OrdenesPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [selectedOrden, setSelectedOrden] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await ordenService.getOrdenes();
        setOrdenes(response);
      } catch (error) {
        console.error('Error al obtener órdenes', error);
      }
    };
    fetchOrdenes();
  }, []);

  const handleSave = () => {
    setSelectedOrden(null); // Resetea el formulario después de guardar
    const fetchOrdenes = async () => {
      try {
        const response = await ordenService.getOrdenes();
        setOrdenes(response);
      } catch (error) {
        console.error('Error al obtener órdenes', error);
      }
    };
    fetchOrdenes();
  };

  const handleEdit = (orden) => {
    setSelectedOrden(orden);
  };

  const handleDelete = async (id) => {
    try {
      await ordenService.deleteOrden(id);
      setOrdenes(ordenes.filter((orden) => orden.id !== id));
    } catch (error) {
      console.error('Error al eliminar orden', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Órdenes</h1>
      <OrdenForm orden={selectedOrden} onSave={handleSave} />
      <ul>
        {ordenes.map((orden) => (
          <li key={orden.id}>
            <strong>Orden ID:</strong> {orden.id} - <strong>Cliente:</strong> {orden.cliente.nombre}
            <button onClick={() => handleEdit(orden)}>Editar</button>
            <button onClick={() => handleDelete(orden.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdenesPage;
