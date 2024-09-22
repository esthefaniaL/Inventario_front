// src/pages/ClientesPage.js
import React, { useState, useEffect } from 'react';
import clienteService from '../services/clienteService';
import ClienteForm from '../components/ClienteForm';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await clienteService.getClientes();
        setClientes(response);
      } catch (error) {
        console.error('Error al obtener clientes', error);
      }
    };
    fetchClientes();
  }, []);

  const handleSave = () => {
    setSelectedCliente(null); // Resetea el formulario después de guardar
    const fetchClientes = async () => {
      try {
        const response = await clienteService.getClientes();
        setClientes(response);
      } catch (error) {
        console.error('Error al obtener clientes', error);
      }
    };
    fetchClientes();
  };

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente);
  };

  const handleDelete = async (id) => {
    try {
      await clienteService.deleteCliente(id);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    } catch (error) {
      console.error('Error al eliminar cliente', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <ClienteForm cliente={selectedCliente} onSave={handleSave} />
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre}
            <button onClick={() => handleEdit(cliente)}>Editar</button>
            <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesPage;
