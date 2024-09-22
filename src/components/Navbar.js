// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/empresa">Empresas</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/clientes">Clientes</Link>
        </li>
        <li>
          <Link to="/categorias">Categorías</Link>
        </li>
        <li>
          <Link to="/ordenes">Órdenes</Link>
        </li>
        <li>
          <Link to="/inventario">Inventario</Link>
        </li>
        <li>
          <Link to="/">Cerrar Sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
