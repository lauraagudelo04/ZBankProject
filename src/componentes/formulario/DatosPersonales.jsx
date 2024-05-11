import React,{useState}from "react";
import { Col, Form, Row } from "react-bootstrap";
import { tiposDocumentos } from "../../models/datosFormulario";

function DatosPersonales({ data, transferenciaDatos }) {
  const [emailError, setEmailError] = useState("");

  const items = data;
  const updateValuesForm = (e) => {
    const copyState = { ...items };
    const { id, value } = e.target;
    copyState[id] = value;    
    transferenciaDatos(copyState);
    if (id === "correo" && validateEmail(value)) {
      setEmailError("");
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const validatePositiveInteger = (value) => {
    return /^\d+$/.test(value); 
}

  return (
    <React.Fragment>
      <Row  className="mb-3">
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
      </Row >
      <Row  className="mb-3">
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
          <Form.Control id="numeroDocumento" type="number" min="0" 
          required onChange={(e) => updateValuesForm(e)}  />
        </Col>
      </Row>
      <Row  className="mb-3">
        <Col md={12}>
          <Form.Text className="form-text-content">Correo electrónico</Form.Text>
          <Form.Control
            id="correo"
            type="email"
            required
            onChange={(e) => {
              const email = e.target.value;
              if (validateEmail(email)) {
                updateValuesForm(e);
              } else {
                setEmailError(
                  "El correo no cumple con la estructura necesaria: ejemplo@ejemplo.com"
                );
              }
            }}
          />
          {emailError && <div style={{ color: "white" }}>{emailError}</div>}
        </Col>
      </Row>
    </React.Fragment>
  );
}


export default DatosPersonales;
