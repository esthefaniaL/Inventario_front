// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box } from '@material-ui/core';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) { // Verificar que se hayan proporcionado credenciales válidas
      localStorage.setItem('token', 'fake-token-123'); // Hardcodear un token fake
      navigate('/dashboard'); // Redirigir al dashboard
    } else {
      setError('Por favor, proporciona credenciales válidas'); // Mostrar error si las credenciales no son válidas
    }
  };
/** 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://tu-api-url.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Guarda el token en el localStorage
        navigate('/dashboard'); // Redirige al dashboard o a la página principal
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Credenciales incorrectas'); // Muestra el error si las credenciales no son válidas
      }
    } catch (error) {
      setError('Ocurrió un error en la solicitud'); // Maneja errores de red u otros errores
    }
  };
*/
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
      <style jsx>{`
        .login-container {
          width: 300px;
          margin: 100px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }
        h1 {
          text-align: center;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        .error-message {
          color: red;
          text-align: center;
        }
        button {
          width: 100%;
          padding: 10px;
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

export default LoginPage;
