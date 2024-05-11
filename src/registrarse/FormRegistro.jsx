import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import DatosPersonales from "../formulario/DatosPersonales";
import { divisas } from "../../models/datosFormulario";
import DatosUsuario from "../formulario/DatosUsuario";
import { postModel } from "../../models/postModel";
import {enviarDatos} from '../../services/ApiService'
import "./Formulario.css"
function FormRegistro() {
  
    const [formValues, setFormValues] = useState(postModel)
    const [postStatus, setPostStatus] = useState([])
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
      const { nombre, apellido, correo, divisa, clave, tipoDocumento, numeroDocumento, nombreUsuario } = formValues;  
      const allFieldsFilled = [nombre, apellido, correo, divisa, clave, tipoDocumento, numeroDocumento, nombreUsuario].every(value => value !== '');
      setDisableButton(!allFieldsFilled)
    }, [formValues]) 

    const handleValues = (data) => {
        setFormValues({...formValues, ...data})
    }

    const updateValuesForm = (e) => {
      const copyState = { ...formValues };
      const { id, value } = e.target;
      copyState[id] = value;
      setFormValues(copyState);
    };

    const handlePost = async () => {
      setDisableButton(true)
      try {
        const response = await enviarDatos(formValues)
        console.log(response)
        setPostStatus(response)
        // alert(`${postStatus.Message}`) SOLO FORMA BASE, VERIFICAR LA RESPUESTA
        alert('Se registró el usuario exitosamente.')
        window.location.reload()
        setDisableButton(false)           
      }catch(error){
        setPostStatus(error)
        alert('Se presentó un error al registrar el usuario.')
        window.location.reload(true)
        setDisableButton(false)        
      }
    }
   
    
  return (
    <Card className="container">
      <Form >
        <Form.Text className="container-title mb-6">Registro Usuario ZBank</Form.Text>
        <DatosPersonales data={formValues} transferenciaDatos={handleValues}/>
        <Row  className="mb-3">
          <Col md={12}>
            <Form.Text className="form-text-content">Seleccione su divisa</Form.Text>
            <Form.Select id="divisa" onChange={(e) => updateValuesForm(e)} >
              {divisas.map((item, index) => (
                <option key={index} id={item.id} value={item.id}>
                  {item.tipo}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <DatosUsuario data={formValues} transferenciaDatos={handleValues} />
        <Row  className="mb-3">
          <Col className="distribution">
            <Button className={`btn ${disableButton ? 'btn-disabled' : ''}`} onClick={handlePost} disabled={disableButton}>Registrar</Button>
          </Col>
        </Row>        
      </Form>
    </Card>
  );
}

export default FormRegistro;
