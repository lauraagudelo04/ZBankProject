import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { obtenerDatosTiposDocumentos } from "../../services/ApiService";

function DatosPersonales({ data, transferenciaDatos }) {
  const [emailError, setEmailError] = useState("");
  const [docError, setDocError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const items = data;
  const [dataTiposDocumentos, setDataTiposDocumentos] = useState([]);
  
  /*useEffect(() => {
    async function fetch() {
      try {
        const info = await obtenerDatosTiposDocumentos();
        setDataTiposDocumentos(info);
        if (info && info.length > 0 && !items.tipoDocumento.id) {
          transferenciaDatos({
            ...items,
            tipoDocumento: { id: info[0].id, nombre: info[0].nombre, abreviacion: info[0].abreviacion }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [items, transferenciaDatos]);

  */

  useEffect(() => {
    async function fetch() {
      const info = await obtenerDatosTiposDocumentos();
      setDataTiposDocumentos(info);
    }
    fetch();
  }, []);
  
  const updateValuesForm = (e) => {
    const { id, value } = e.target;
    const copyState = { ...items };

    if (id === "correo" && validateEmail(value) === false) {
      setEmailError(
        "El correo actual no cuenta con la estructura requerida: Ejemplo@ejemplo.com "
      );
    } else {
      setEmailError("");
    }

    if (id === "nombre") {
      if (value.length > 20) {
        setNameError("El nombre no puede exceder los 20 caracteres.");
      } else if (!validateName(value)) {
        setNameError("El nombre no cumple con los caracteres minimos permitidos(1).");
      } else {
        setNameError("");
      }
    }

    if (id === "apellido") {
      if (value.length > 20) {
        setLastNameError("El apellido no puede exceder los 20 caracteres.");
      } else if (!validateLastName(value)) {
        setLastNameError(
          "El apellido no cumple con los caracteres minimos permitidos(1)."
        );
      } else {
        setLastNameError("");
      }
    }

    if (id === "numeroDocumento") {
      if (value.length > 10) {
        setDocError("El número de documento excede los 10 caracteres permitidos");
      } else if (!validateDoc(value)) {
        setDocError("El número de documento no cumple con los caracteres minimos permitidos(1).");
      } else {
        setDocError("");
      }
    }

    copyState[id] = value;
    transferenciaDatos(copyState);
  };

  const validateEmail = (email) => {
    const emailRegex = /^(?=.{1,256}$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDoc = (doc) => {
    // Verificar que el número de documento sea un número positivo sin caracteres especiales
    const docRegex = /^\d{1,10}$/;
    return docRegex.test(doc) && doc >= 0;
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]{1,20}$/;
    return nameRegex.test(name);
  };

  const validateLastName = (lastName) => {
    const lastNameRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]{1,20}$/;
    return lastNameRegex.test(lastName);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    // Permitir solo teclas numéricas, teclas de control, y las necesarias para la edición (como Backspace)
    if (
      !/^[0-9]$/.test(key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(key)
    ) {
      e.preventDefault();
    }
  };

  const handleKeyDownOnlyLetters = (e) => {
    const key = e.key;
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];
    // Letras con tildes, ñ y Ñ, y espacio
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;

    if (!regex.test(key) && !allowedKeys.includes(key)) {
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
            onKeyDown={handleKeyDownOnlyLetters}
            onChange={(e) => updateValuesForm(e)}
          />
          {nameError && (
            <div style={{ color: "red", fontSize: 12 }}>{nameError}</div>
          )}
        </Col>
        <Col md={6}>
          <Form.Text className="form-text-content">Apellidos</Form.Text>
          <Form.Control
            type="text"
            id="apellido"
            required
            onKeyDown={handleKeyDownOnlyLetters}
            onChange={(e) => updateValuesForm(e)}
          />
          {lastNameError && (
            <div style={{ color: "red", fontSize: 12 }}>{lastNameError}</div>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Text className="form-text-content">Tipo de documento</Form.Text>
          <Form.Select id="tipoDocumento" onChange={(e) => updateValuesForm(e)}>
            {dataTiposDocumentos && (
              <>
                {dataTiposDocumentos.map((item, index) => (
                  <option key={index} id={item.id} value={item.id}>
                    {item.abreviacion} - {item.nombre}
                  </option>
                ))}
              </>
            )}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Text className="form-text-content">
            Numero de documento
          </Form.Text>
          <Form.Control
            id="numeroDocumento"
            type="number"
            min="0"
            required
            onKeyDown={handleKeyDown}
            onChange={(e) => updateValuesForm(e)}
          />
          {docError && (
            <div style={{ color: "red", fontSize: 12 }}>{docError}</div>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Text className="form-text-content">
            Correo electrónico
          </Form.Text>
          <Form.Control
            id="correo"
            type="email"
            required
            onChange={(e) => updateValuesForm(e)}
          />
          {emailError && (
            <div style={{ color: "red", fontSize: 12 }}>{emailError}</div>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DatosPersonales;