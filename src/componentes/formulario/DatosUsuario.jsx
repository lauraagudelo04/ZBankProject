import React from 'react'
import { Col, Form, Row } from 'react-bootstrap';


function DatosUsuario({ data, transferenciaDatos }) {
  const items = data;

  const updateValuesForm = (e) => {
    const copyState = { ...items };
    const { id, value } = e.target;
    copyState[id] = value;
    
    transferenciaDatos(copyState);
  };
  return (
    <React.Fragment>
      <Row  className="mb-3">
        <Col md={6}>
          <Form.Text className="form-text-content">Nombre de usuario</Form.Text>
          <Form.Control id="nombreUsuario" type="text" required onChange={(e) => updateValuesForm(e)}/>
        </Col>
        <Col md={6}>
          <Form.Text className="form-text-content">Contraseña</Form.Text>
          <Form.Control id="clave" type="password" required onChange={(e) => updateValuesForm(e)} />
        </Col>
      </Row>
    </React.Fragment>
    );
}

export default DatosUsuario
