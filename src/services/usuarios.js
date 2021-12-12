import axios from 'axios'
import { getSessionCookie } from '../auth/session'

const apiHost = process.env.REACT_APP_API_HOST
const apiPort = 8082

// const baseUrl = 'http://localhost:8082/user'
const baseUrl = apiHost + ':' + apiPort + '/user'

const cookieSession = getSessionCookie()

const getAll = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }

  const { data } = await axios.get(
    baseUrl,
    { headers }
  )

  const ans = []
  data.usuarios.map(x => {
    const { id, password, ...temp } = x
    return ans.push(temp)
  })

  return ans
}

const postUsuario = async (values) => {
  const { passwordconfirm, ...newvalues } = values
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.post(
    baseUrl,
    newvalues,
    { headers }
  )

  return data
}

const deleteUsuario = async (user) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.delete(
    baseUrl + '/' + user,
    { headers }
  )
  return data
}

const putUsuario = async (values) => {
  const { user, passwordconfirm, ...newValues } = values
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.put(
    baseUrl + '/' + user,
    newValues,
    { headers }
  )

  return data
}

const putUsuarioPassword = async (values) => {
  const { user, ...newValues } = values
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.put(
    baseUrl + '/password/' + user,
    newValues,
    { headers }
  )

  return data
}

const putUsuarioNombreRoles = async (values) => {
  const { user, ...newValues } = values
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.put(
    baseUrl + '/nameroles/' + user,
    newValues,
    { headers }
  )

  return data
}

const putUsuarioNombre = async (values) => {
  const { user, ...newValues } = values

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.put(
    baseUrl + '/name/' + user,
    newValues,
    { headers }
  )

  return data
}

const putUsuarioRoles = async (values) => {
  const { user, ...newValues } = values
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.put(
    baseUrl + '/roles/' + user,
    newValues,
    { headers }
  )

  return data
}

const getUsuario = async (user) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + cookieSession
  }
  const { data } = await axios.get(
    baseUrl + '/' + user,
    { headers }
  )
  return data.user
}

export default { getAll, postUsuario, deleteUsuario, putUsuario, getUsuario, putUsuarioPassword, putUsuarioNombre, putUsuarioRoles, putUsuarioNombreRoles }
