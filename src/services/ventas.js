import axios from 'axios'
import { getSessionCookie } from '../auth/session'

const apiHost = process.env.REACT_APP_API_HOST

const baseUrl = apiHost + ':'
const apiRoute = '/api/v1/ventas/'

const portBogota = '8087'
const portCali = '8097'
const portMedellin = '8107'

const registrarVenta = async (port, values) => {
  const cookieSession = getSessionCookie()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.post(
    baseUrl + port + apiRoute,
    JSON.stringify(values),
    { headers }
  )
  return data
}

const getAllVentas = async (port) => {
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

const totalVentas = (ciudad) => {
  switch (ciudad) {
    case 'bogota' :
      return getAllVentas(portBogota).then((data) => data.reduce((acc, el) => acc + el.valor_venta, 0))
    case 'cali' :
      return getAllVentas(portCali).then((data) => data.reduce((acc, el) => acc + el.valor_venta, 0))
    case 'medellin':
      return getAllVentas(portMedellin).then((data) => data.reduce((acc, el) => acc + el.valor_venta, 0))
    default:
      break
  }
}

export default { registrarVenta, getAllVentas, totalVentas }
