import React, { useState, useEffect } from 'react';
import empresaService from '../services/empresaService';
import EmpresaForm from '../components/EmpresaForm';
import { Container, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';

const EmpresaPage = () => {
  console.log('EmpresaPage mounted'); // Agrega este console.log
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await empresaService.getEmpresas();
        console.log('Response:', response); // Agrega este console.log
        setEmpresas(response);
      } catch (error) {
        console.error('Error al obtener empresas', error);
      }
    };
    fetchEmpresas();
  }, []);

  const handleSave = () => {
    setSelectedEmpresa(null); // Resetea el formulario después de guardar
    const fetchEmpresas = async () => {
      try {
        const response = await empresaService.getEmpresas();
        setEmpresas(response);
      } catch (error) {
        console.error('Error al obtener empresas', error);
      }
    };
    fetchEmpresas();
  };

  const handleEdit = (empresa) => {
    setSelectedEmpresa(empresa);
  };

  const handleDelete = async (id) => {
    try {
      await empresaService.deleteEmpresa(id);
      setEmpresas(empresas.filter((empresa) => empresa.nit !== id));
    } catch (error) {
      console.error('Error al eliminar empresa', error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Gestión de Empresas</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h5">Formulario de Empresa</Card.Header>
            <Card.Body>
              <EmpresaForm empresa={selectedEmpresa} onSave={handleSave} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3 className="text-center mb-4">Listado de Empresas</h3>
          <ListGroup>
            {empresas.map((empresa) => (
              <ListGroup.Item key={empresa.nit} className="d-flex justify-content-between align-items-center">
                <span>{empresa.nombre}</span>
                <div>
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(empresa)}>
                    Editar
                  </Button>{' '}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(empresa.nit)}>
                    Eliminar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default EmpresaPage;
