import axios from 'axios'
const baseUrl = 'http://localhost:'
const apiRoute = '/api/v1/productos/'

const postProductos = async (port, array) => {
  const body = JSON.stringify(array)
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    baseUrl + port + apiRoute,
    body,
    { headers }
  )

  return data
}

const getProducto = async (port, codigo) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.get(
    baseUrl + port + apiRoute + codigo,
    { headers }
  )

  return data
}

export default { postProductos, getProducto }
