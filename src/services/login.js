import axios from 'axios'
import { getSessionCookie } from '../auth/session'

const login = async (credentials) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    'http://localhost:8082/login',
    credentials,
    { headers }
  )

  return data
}

const isAuhtenticated = async () => {
  const cookieSession = getSessionCookie()
  const headers = {
    Authorization: 'Bearer ' + cookieSession
  }
  try {
    const { data } = await axios.get(
      'http://localhost:8082/login/validate',
      { headers }
    )
    return data
  } catch {
    return { error: 'Not authorized' }
  }
}

export { login, isAuhtenticated }
