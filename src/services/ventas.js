import axios from 'axios'
const baseUrl = 'http://localhost:'
const apiRoute = '/api/v1/ventas/'

const registrarDetalleVentas = async (port, data) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  try {
    await axios.post(
      'http://localhost:8087/api/v1/detalleVentas/',
      JSON.stringify(data),
      { headers }
    )
  } catch {
    alert('no se pudo ingresar los detalles de la venta')
  }
}

// const registrarVenta = async (data) => {
//   const headers = {
//     'Content-Type': 'application/json'
//   }

//   try {
//     await axios.post(
//       'http://localhost:8087/api/v1/ventas/',
//       JSON.stringify(data),
//       { headers }
//     )
//     alert('venta registrada con éxito')
//   } catch {
//     alert('no se pudo ingresar la venta')
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

// const buscarProducto = async (codigoProducto) => {
//   const headers = {
//     'Content-Type': 'application/json'
//   }
//   const { data } = await axios.get(
//     'http://localhost:8085/api/v1/productos/' + codigoProducto,
//     { headers }
//   )
//   return data
// }

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

export default { registrarDetalleVentas, registrarVenta, getAllVentas }
