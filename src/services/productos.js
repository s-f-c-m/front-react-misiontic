import axios from 'axios'
const baseUrl = 'http://localhost:8085/api/v1/productos'

const postProductos = async (array) => {
  const body = JSON.stringify(array)
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    baseUrl,
    body,
    { headers }
  )

  return data
}

const getProducto = async (codigo) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    baseUrl + '/' + codigo,
    { headers }
  )

  return data
}

export default { postProductos, getProducto }
