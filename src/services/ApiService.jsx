import axios from "axios";
import { postMethodUrl } from "../models/endpointDirectory";


export const enviarDatos = async (data) => {
  const url = postMethodUrl + '8080/api/v1/persona/registrar'
  try {
    console.log(data)
    const respuesta = await axios.post(url, data);
    return respuesta.data;
  } catch (error) {
    throw error;
  }
};
