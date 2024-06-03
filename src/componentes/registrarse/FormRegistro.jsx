import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import DatosPersonales from "../formulario/DatosPersonales";
import DatosUsuario from "../formulario/DatosUsuario";
import { postModel } from "../../models/postModel";
import {enviarDatos, obtenerDatosDivisas} from '../../services/ApiService'
import "./Formulario.css";

function FormRegistro() {
  
    const [formValues, setFormValues] = useState(postModel)
    const [postStatus, setPostStatus] = useState([])
    const [disableButton, setDisableButton] = useState(false)
    const [data, setData] = useState([]);
    useEffect(() => {

      const { nombre, apellido, correo, divisa, clave, tipoDocumento, numeroDocumento, nombreUsuario } = formValues;  
      const allFieldsFilled = [nombre, apellido, correo, divisa, clave, tipoDocumento, numeroDocumento, nombreUsuario].every(value => value !== '');
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w])[A-Za-z\d\W]{8,30}$/;
      const isValidPassword = passwordPattern.test(clave) && clave.length >= 8 && clave.length <= 30
      const emailPattern =/^(?=.{1,256}$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailPattern.test(correo) && correo.length<=256;
      const usernamePattern=/^[a-zA-Z0-9]{1,25}$/;
      const isValidUsername = usernamePattern.test(nombreUsuario);
      const namePattern= /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]{1,20}$/; 
      const lastNamePattern= /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]{1,20}$/;  
      const isValidName=namePattern.test(nombre) && nombre.length<=20;
      const isValidLastName=lastNamePattern.test(apellido) && apellido.length<=20;
      const docPattern=/^\d{1,10}$/
      const isValidDoc= docPattern.test(numeroDocumento) && numeroDocumento.length<=10;
      setDisableButton(!(allFieldsFilled && isValidPassword && isEmailValid && isValidUsername 
        && isValidName && isValidLastName && isValidDoc))
    }, [formValues])

    //console.log(formValues.numeroDocumento)

    const handleValues = (data) => {
        setFormValues({...formValues, ...data})
    }


   /* useEffect(() => {
      async function fetch() {
        try {
          const info = await obtenerDatosDivisas();
          setData(info);
          if (info && info.length > 0 && !formValues.divisa.id) {
            setFormValues(prevValues => ({
              ...prevValues,
              divisa: { id: info[0].id, codigoISO: info[0].codigoISO, nombre: info[0].nombre }
            }));
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetch();
    }, []);*/

    useEffect(() => {
      async function fetch() {
        const info = await obtenerDatosDivisas();
        setData(info)
      }
      fetch();
    },[])

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
        alert(response.mensajes.join(', '))
        //window.location.reload()
        setDisableButton(false)           
      }catch(error){
        setPostStatus(error)
        //console.log(error.response.data.mensajes[0])
        alert(error.response.data.mensajes.join(', '))
        //window.location.reload()
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
            {
              data && (
                <><Form.Text className="form-text-content">Seleccione su divisa</Form.Text>
                <Form.Select id="divisa" onChange={(e) => updateValuesForm(e)} >
                  {data.map((item, index) => (
                    <option key={index} id={item.id} value={item.id} >
                    {item.codigoISO} -{item.nombre}
                    </option>
                  ))}
                </Form.Select>

                </>
              )
            }
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