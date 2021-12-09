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
    case ciudad === 'bogota' :
      return getAllVentas(portBogota).reduce((acc, venta) => acc + venta.valor_venta, 0).toFixed(2)
    case ciudad === 'cali' :
      return getAllVentas(portCali).reduce((acc, venta) => acc + venta.valor_venta, 0).toFixed(2)
    case ciudad === 'medellin':
      return getAllVentas(portMedellin).reduce((acc, venta) => acc + venta.valor_venta, 0).toFixed(2)
  }
}

export default { registrarVenta, getAllVentas, totalVentas }
