import axios from 'axios'
import { getSessionCookie } from '../auth/session'

// import { getSessionCookie } from '../auth/session'

const baseUrl = 'http://localhost:'
const apiRoute = '/api/v1/clientes/'

const getAll = async (port) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.get(
    baseUrl + port + apiRoute,
    { headers }
  )
  return data
}

const postCliente = async (port, data) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const resp = await axios.post(
    baseUrl + port + apiRoute,
    data,
    { headers }
  )
  return resp
}

const getCliente = async (port, cedula) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.get(
    baseUrl + port + apiRoute + cedula,
    { headers }
  )
  return data
}

const putCliente = async (port, datos) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.put(
    baseUrl + port + apiRoute + datos.cedulaCliente,
    datos,
    { headers }
  )
  return data
}

const deleteCliente = async (port, cedula) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.delete(
    baseUrl + port + apiRoute + cedula,
    { headers }
  )
  return data
}

export default { getAll, postCliente, getCliente, putCliente, deleteCliente }
