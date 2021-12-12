import axios from 'axios'
import { getSessionCookie } from '../auth/session'

const apiHost = process.env.REACT_APP_API_HOST

const baseUrl = apiHost + ':'
const apiRoute = '/api/v1/productos/'

const postProductos = async (port, array) => {
  const cookieSession = getSessionCookie()
  const body = JSON.stringify(array)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.post(
    baseUrl + port + apiRoute,
    body,
    { headers }
  )

  return data
}

const getProducto = async (port, codigo) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.get(
    baseUrl + port + apiRoute + codigo,
    { headers }
  )

  return data
}

export default { postProductos, getProducto }
