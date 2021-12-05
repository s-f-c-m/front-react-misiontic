import axios from 'axios'

const registrarDetalleVentas = async (data) => {
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

const registrarVenta = async (values) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    'http://localhost:8087/api/v1/ventas/',
    JSON.stringify(values),
    { headers }
  )
  return data
}

const buscarProducto = async (codigoProducto) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.get(
    'http://localhost:8085/api/v1/productos/' + codigoProducto,
    { headers }
  )
  return data
}

const getAllVentas = async () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.get(
    'http://localhost:8087/api/v1/ventas/',
    { headers }
  )
  return data
}

export default { registrarDetalleVentas, registrarVenta, buscarProducto, getAllVentas }
