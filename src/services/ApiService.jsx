import axios from "axios";
import { postMethodUrl } from "../models/endpointDirectory";


export const enviarDatos = async (data) => {
  console.log(data)
  const url = postMethodUrl + '8080/zbank/crearperfil'
  try {
    console.log(data)
    const respuesta = await axios.post(url, data);
    console.log(respuesta)
    return respuesta.data;
    
  } catch (error) {
    throw error;
  }
};


export const obtenerDatosDivisas = async() => {
  const url = "http://localhost:8080/zbank/divisas";
  try {
    const respuesta = await axios.get(url);
    console.log(respuesta.data.datos)
    return respuesta.data.datos
  } catch (error) {
    throw error;
  }
}

export const obtenerDatosTiposDocumentos= async() => {
  const url = "http://localhost:8080/zbank/tiposDocumentos";
  try {
    const respuesta = await axios.get(url);
    console.log(respuesta.data.datos)
    return respuesta.data.datos
  } catch (error) {
    throw error;
  }
}