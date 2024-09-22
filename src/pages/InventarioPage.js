// src/pages/InventarioPage.js
import React, { useState, useEffect } from 'react';
import empresaService from '../services/empresaService';
import productoService from '../services/productoService';

const InventarioPage = () => {
  const [empresas, setEmpresas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    // Obtener todas las empresas para el selector
    const fetchEmpresas = async () => {
      try {
        const response = await empresaService.getEmpresas();
        setEmpresas(response);
      } catch (error) {
        console.error('Error al obtener las empresas', error);
      }
    };
    fetchEmpresas();
  }, []);

  useEffect(() => {
    // Obtener los productos cuando se selecciona una empresa
    if (selectedEmpresa) {
      const fetchProductos = async () => {
        try {
          const response = await productoService.getProductos(); // Se pueden filtrar productos por empresa aquí si es necesario
          const productosEmpresa = response.filter(producto => producto.empresaId === selectedEmpresa);
          setProductos(productosEmpresa);
        } catch (error) {
          console.error('Error al obtener los productos', error);
        }
      };
      fetchProductos();
    }
  }, [selectedEmpresa]);

  const handleEmpresaChange = (e) => {
    setSelectedEmpresa(e.target.value);
    setProductos([]); // Limpiar la lista de productos cuando se cambia la empresa
  };

  const handleDownloadPdf = async () => {
    try {
      // Llamada a la API para generar el PDF y obtener el URL
      const response = await fetch(`https://tu-api-url.com/api/inventario/pdf/${selectedEmpresa}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      setPdfUrl(result.pdfUrl); // Asigna la URL del PDF al estado
    } catch (error) {
      console.error('Error al generar el PDF', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      // Llamada a la API para enviar el PDF por correo
      await fetch(`https://tu-api-url.com/api/inventario/enviar-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          empresaId: selectedEmpresa,
          email: 'destinatario@example.com' // Cambia esto por el correo destino
        })
      });
      alert('El PDF se ha enviado correctamente al correo.');
    } catch (error) {
      console.error('Error al enviar el correo', error);
    }
  };

  return (
    <div>
      <h1>Inventario de Productos por Empresa</h1>
      <select onChange={handleEmpresaChange} value={selectedEmpresa}>
        <option value="">Seleccione una empresa</option>
        {empresas.map((empresa) => (
          <option key={empresa.nit} value={empresa.nit}>
            {empresa.nombre}
          </option>
        ))}
      </select>

      {selectedEmpresa && (
        <>
          <h2>Productos de la Empresa</h2>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Características</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.codigo}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.caracteristicas}</td>
                  <td>{producto.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleDownloadPdf}>Descargar PDF</button>
          <button onClick={handleSendEmail}>Enviar PDF por Correo</button>
          {pdfUrl && (
            <div>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Descargar PDF Generado
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InventarioPage;
