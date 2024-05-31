import axios from "axios";
import { postMethodUrl } from "../models/endpointDirectory";


export const enviarDatos = async (data) => {
  console.log(data)
  const url = postMethodUrl + '8080/zbank/crearperfil'
  try {
    console.log(data)
    const respuesta = await axios.post(url, data);
    return respuesta.data;
  } catch (error) {
    throw error;
  }
};