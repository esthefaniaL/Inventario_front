// src/components/ClienteForm.js
import React, { useState, useEffect } from 'react';
import clienteService from '../services/clienteService';

const ClienteForm = ({ cliente, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    correo: '',
    telefono: '',
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

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
        await clienteService.updateCliente(formData.id, formData);
      } else {
        await clienteService.createCliente(formData);
      }
      onSave(); // Refresca la lista de clientes o cierra el formulario
    } catch (error) {
      console.error('Error al guardar el cliente', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />
      <button type="submit">Guardar Cliente</button>
    </form>
  );
};

export default ClienteForm;
