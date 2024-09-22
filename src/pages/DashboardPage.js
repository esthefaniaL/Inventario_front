// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import empresaService from '../services/empresaService';
import productoService from '../services/productoService';
import clienteService from '../services/clienteService';
import ordenService from '../services/ordenService';

const DashboardPage = () => {
  const [empresasCount, setEmpresasCount] = useState(0);
  const [productosCount, setProductosCount] = useState(0);
  const [clientesCount, setClientesCount] = useState(0);
  const [ordenesCount, setOrdenesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresas = await empresaService.getEmpresas();
        setEmpresasCount(empresas.length);

        const productos = await productoService.getProductos();
        setProductosCount(productos.length);

        const clientes = await clienteService.getClientes();
        setClientesCount(clientes.length);

        const ordenes = await ordenService.getOrdenes();
        setOrdenesCount(ordenes.length);
      } catch (error) {
        console.error('Error al obtener datos para el dashboard', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard de Administración</h1>
      <div className="stats">
        <div className="stat-item">
          <h3>Empresas</h3>
          <p>{empresasCount}</p>
        </div>
        <div className="stat-item">
          <h3>Productos</h3>
          <p>{productosCount}</p>
        </div>
        <div className="stat-item">
          <h3>Clientes</h3>
          <p>{clientesCount}</p>
        </div>
        <div className="stat-item">
          <h3>Órdenes</h3>
          <p>{ordenesCount}</p>
        </div>
      </div>
      <div className="quick-links">
        <h2>Accesos Rápidos</h2>
        <Link to="/empresa">
          <button>Gestionar Empresas</button>
        </Link>
        <Link to="/productos">
          <button>Gestionar Productos</button>
        </Link>
        <Link to="/clientes">
          <button>Gestionar Clientes</button>
        </Link>
        <Link to="/categorias">
          <button>Gestionar Categorías</button>
        </Link>
        <Link to="/ordenes">
          <button>Gestionar Órdenes</button>
        </Link>
      </div>
      <style jsx>{`
        .stats {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;
        }
        .stat-item {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .quick-links {
          margin-top: 30px;
          text-align: center;
        }
        button {
          margin: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
