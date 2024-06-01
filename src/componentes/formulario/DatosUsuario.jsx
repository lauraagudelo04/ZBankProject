import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';


function DatosUsuario({ data, transferenciaDatos }) {
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const items = data;

  const updateValuesForm = (e) => {
    const copyState = { ...items };
    const { id, value } = e.target;
    
    if(id === 'clave' && validatePassword(value) === false) {
      setPasswordError('La contraseña debe contener un mínimo de 8 caracteres a 30, un caracter especial, una mayuscula, una minuscula y un número')
    }else {
      setPasswordError('')
    }

    if (id === "nombreUsuario") {
      if (value.length > 25) {
        setUsernameError("El nombre de usuario no puede exceder los 25 caracteres.");
      } else if (!validateUsername(value)) {
        setUsernameError("El nombre de usuario no cumple con los caracteres minimos permitidos(1).");
      } else {
        setUsernameError('');
      }
    }

    copyState[id] = value;
    transferenciaDatos(copyState);
  };

  const validatePassword = (password) => {
     // Validar la contraseña: mínimo 8 caracteres, máximo 30, mínimo una mayúscula, un número y un carácter especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w])[A-Za-z\d\W]{8,30}$/
    return passwordRegex.test(password);
  };

  const validateUsername=(username)=>{
    const usernameRegex = /^[a-zA-Z0-9]{1,25}$/;
    return usernameRegex.test(username);
  }

  const handleKeyDown = (e) => {
    const key = e.key;
    if (e.target.id === "nombreUsuario") {
      if (!/^[a-zA-Z0-9]$/.test(key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(key)) {
        e.preventDefault();
      }
    } else if (!/^[0-9]$/.test(key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(key)) {
      e.preventDefault();
    }
  };

  return (
    <React.Fragment>
      <Row  className="mb-3">
        <Col md={6}>
          <Form.Text className="form-text-content">Nombre de usuario</Form.Text>
          <Form.Control id="nombreUsuario" type="text"
           required 
          onKeyDown={handleKeyDown}
          onChange={(e) => 
          updateValuesForm(e)}/>
          {usernameError && <div style={{ color: "red", fontSize: 12 }}>{usernameError}</div>}
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