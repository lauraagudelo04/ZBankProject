import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';


function DatosUsuario({ data, transferenciaDatos }) {
  const [passwordError, setPasswordError] = useState("");
  const items = data;

  const updateValuesForm = (e) => {
    const copyState = { ...items };
    const { id, value } = e.target;
    
    if(id === 'clave' && validatePassword(value) === false) {
      setPasswordError('La contraseña debe contener un mínimo de 8 caracteres a 30, un caracter especial, una mayuscula y un número')
    }else {
      setPasswordError('')
    }

    copyState[id] = value;
    transferenciaDatos(copyState);
  };

  const validatePassword = (password) => {
     // Validar la contraseña: mínimo 8 caracteres, máximo 30, mínimo una mayúscula, un número y un carácter especial
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w])[A-Za-z\d\W]{8,30}$/;
    return passwordRegex.test(password);
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
          <Form.Control 
          id="clave" 
          type="password" 
          required
           onChange={(e) => updateValuesForm(e)} 
          />
          {passwordError && <div style={{ color: "red", fontSize: 12 }}>{passwordError}</div>}
        </Col>
      </Row>
    </React.Fragment>
    );
}

export default DatosUsuario