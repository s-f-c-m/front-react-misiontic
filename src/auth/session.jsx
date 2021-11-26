import { createContext, useState } from 'react'
import cookie from 'js-cookie'

const setSessionCookie = (session) => {
  cookie.remove('tg-session')
  cookie.set('tg-session', session)
}

const getSessionCookie = () => {
  const sessionCookie = cookie.get('tg-session')
  if (sessionCookie === undefined) {
    return {}
  } else {
    // return JSON.parse(sessionCookie)
    return sessionCookie
  }
}

const SessionContext = createContext()

const SessionProvider = props => {
  const [session, setSession] = useState({
    exp: '',
    iat: '',
    roles: [],
    sub: ''
  })

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {props.children}
    </SessionContext.Provider>
  )
}

export { setSessionCookie, getSessionCookie, SessionContext, SessionProvider }
