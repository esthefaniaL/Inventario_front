// src/components/EmpresaForm.js
import React, { useState, useEffect } from 'react';
import empresaService from '../services/empresaService';

const EmpresaForm = ({ empresa, onSave }) => {
  const [formData, setFormData] = useState({
    nit: '',
    nombre: '',
    direccion: '',
    telefono: '',
  });

  useEffect(() => {
    if (empresa) {
      setFormData(empresa);
    }
  }, [empresa]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.nit) {
        await empresaService.updateEmpresa(formData.nit, formData);
      } else {
        await empresaService.createEmpresa(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error al guardar la empresa', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nit"
        value={formData.nit}
        onChange={handleChange}
        placeholder="NIT"
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
      <input
        type="text"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        placeholder="Dirección"
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
      <button type="submit">Guardar Empresa</button>
    </form>
  );
};

export default EmpresaForm;
