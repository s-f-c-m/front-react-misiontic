import axios from 'axios'
// import { getSessionCookie } from '../auth/session'

const baseUrl = 'http://localhost:8083/api/v1/clientes/'

const getAll = async () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.get(
    baseUrl,
    { headers }
  )
  return data
}

const postCliente = async (data) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const resp = await axios.post(
    baseUrl,
    data,
    { headers }
  )
  return resp
}

const getCliente = async (cedula) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.get(
    baseUrl + cedula,
    { headers }
  )
  return data
}

const putCliente = async (datos) => {
  console.log(datos)
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.put(
    baseUrl + datos.cedulaCliente,
    datos,
    { headers }
  )
  return data
}

const deleteCliente = async (cedula) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.delete(
    baseUrl + cedula,
    { headers }
  )
  return data
}

export default { getAll, postCliente, getCliente, putCliente, deleteCliente }
