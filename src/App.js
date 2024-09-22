// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmpresaPage from './pages/EmpresaPage';
import ProductosPage from './pages/ProductosPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientesPage from './pages/ClientesPage';
import CategoriasPage from './pages/CategoriasPage';
import OrdenesPage from './pages/OrdenesPage';
import LoginPage from './pages/LoginPage';
import InventarioPage from './pages/InventarioPage';
import DashboardPage from './pages/DashboardPage'; // Importar el componente DashboardPage


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/empresa" element={<EmpresaPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/ordenes" element={<OrdenesPage />} />
        <Route path="/inventario" element={<InventarioPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
