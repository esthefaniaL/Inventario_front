// src/components/OrdenForm.js
import React, { useState, useEffect } from 'react';
import ordenService from '../services/ordenService';
import clienteService from '../services/clienteService';
import productoService from '../services/productoService';

const OrdenForm = ({ orden, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    clienteId: '',
    productos: [],
    fecha: '',
    total: 0,
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await clienteService.getClientes();
        setClientes(response);
      } catch (error) {
        console.error('Error al obtener los clientes', error);
      }
    };

    const fetchProductos = async () => {
      try {
        const response = await productoService.getProductos();
        setProductos(response);
      } catch (error) {
        console.error('Error al obtener los productos', error);
      }
    };

    fetchClientes();
    fetchProductos();
    if (orden) {
      setFormData(orden);
      setSelectedProductos(orden.productos);
    }
  }, [orden]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedProductos(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        productos: selectedProductos,
      };

      if (formData.id) {
        await ordenService.updateOrden(formData.id, data);
      } else {
        await ordenService.createOrden(data);
      }
      onSave(); // Refresca la lista de órdenes o cierra el formulario
    } catch (error) {
      console.error('Error al guardar la orden', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="clienteId"
        value={formData.clienteId}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un cliente</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre}
          </option>
        ))}
      </select>
      <select
        name="productos"
        multiple
        value={selectedProductos}
        onChange={handleProductSelect}
        required
      >
        {productos.map((producto) => (
          <option key={producto.codigo} value={producto.codigo}>
            {producto.nombre}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="total"
        value={formData.total}
        onChange={handleChange}
        placeholder="Total"
        required
      />
      <button type="submit">Guardar Orden</button>
    </form>
  );
};

export default OrdenForm;
