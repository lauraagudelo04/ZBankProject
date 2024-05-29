import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { tiposDocumentos } from "../../models/datosFormulario";

function DatosPersonales({ data, transferenciaDatos }) {
  const [emailError, setEmailError] = useState("");
  const [docError, setDocError] = useState("");

  const items = data;

  const updateValuesForm = (e) => {
    const { id, value } = e.target;
    const copyState = { ...items };
    
    if (id === "correo" && validateEmail(value) === false) {
      setEmailError('El correo actual no cuenta con la estructura requerida: Ejemplo@ejemplo.com ')
    }else {
      setEmailError('')
    }

    if (id === "numeroDocumento" && validateDoc(value) === false) {
      setDocError("El número de documento");
    }else {
      setDocError('')
    }

    copyState[id] = value;
    transferenciaDatos(copyState);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDoc = (doc) => {
    // Verificar que el número de documento sea un número positivo sin caracteres especiales
    const docRegex = /^\d+$/;
    return docRegex.test(doc) && doc >= 0;
  };


  const handleKeyDown = (e) => {
    const key = e.key;
    // Permitir solo teclas numéricas, teclas de control, y las necesarias para la edición (como Backspace)
    if (!/^[0-9]$/.test(key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(key)) {
      e.preventDefault();
    }
  };

  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Text className="form-text-content">Nombre Completo</Form.Text>
          <Form.Control
            type="text"
            id="nombre"
            required
            onChange={(e) => updateValuesForm(e)}
          />
        </Col>
        <Col md={6}>
          <Form.Text className="form-text-content">Apellidos</Form.Text>
          <Form.Control
            type="text"
            id="apellido"
            required
            onChange={(e) => updateValuesForm(e)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Text className="form-text-content">Tipo de documento</Form.Text>
          <Form.Select id="tipoDocumento" onChange={(e) => updateValuesForm(e)}>
            {tiposDocumentos.map((item, index) => (
              <option key={index} id={item.id} value={item.id}>
                {item.tipo}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Text className="form-text-content">Numero de documento</Form.Text>
          <Form.Control
            id="numeroDocumento"
            type="number"
            min="0"
            required
            onKeyDown={handleKeyDown}
            onChange={(e) =>updateValuesForm(e)}
          />
           {docError && <div style={{ color: "red", fontSize: 12 }}>{docError}</div>}
        </Col>

      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Text className="form-text-content">Correo electrónico</Form.Text>
          <Form.Control
            id="correo"
            type="email"
            required
            onChange={(e) => updateValuesForm(e)}
          />
          {emailError && <div style={{ color: "red", fontSize: 12 }}>{emailError}</div>}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DatosPersonales;
