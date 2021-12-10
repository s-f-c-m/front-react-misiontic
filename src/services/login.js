import axios from 'axios'
import { getSessionCookie } from '../auth/session'
const host = 'http://localhost:8082/login/'

const login = async (credentials) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    host,
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
      host + 'validate',
      { headers }
    )
    return data
  } catch {
    return { error: 'Not authorized' }
  }
}

export { login, isAuhtenticated }
