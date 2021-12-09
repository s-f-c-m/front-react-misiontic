import axios from 'axios'
const baseUrl = 'http://localhost:'
const apiRoute = '/api/v1/ventas/'
const portBogota = '8087'
const portCali = '8097'
const portMedellin = '8107'

// const registrarDetalleVentas = async (port, data) => {
//   const headers = {
//     'Content-Type': 'application/json'
//   }

//   try {
//     await axios.post(
//       'http://localhost:8087/api/v1/detalleVentas/',
//       JSON.stringify(data),
//       { headers }
//     )
//   } catch {
//     alert('no se pudo ingresar los detalles de la venta')
//   }
// }

const registrarVenta = async (port, values) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    baseUrl + port + apiRoute,
    JSON.stringify(values),
    { headers }
  )
  return data
}

const getAllVentas = async (port) => {
  const headers = {
    'Content-Type': 'application/json'
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
