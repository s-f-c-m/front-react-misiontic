import axios from 'axios'
import { getSessionCookie } from '../auth/session'

const apiHost = process.env.REACT_APP_API_HOST

const baseUrl = apiHost + ':'
const apiRoute = '/api/v1/proveedores/'

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

const postProveedor = async (port, data) => {
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

const getProveedor = async (port, nit) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.get(
    baseUrl + port + apiRoute + nit,
    { headers }
  )
  return data
}

const putProveedor = async (port, datos) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.put(
    baseUrl + port + apiRoute + datos.nitProveedor,
    datos,
    { headers }
  )
  return data
}

const deleteProveedor = async (port, nit) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.delete(
    baseUrl + port + apiRoute + nit,
    { headers }
  )
  return data
}

export default { getAll, postProveedor, getProveedor, putProveedor, deleteProveedor }
