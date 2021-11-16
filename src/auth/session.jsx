import { createContext, useReducer } from 'react'
import cookie from 'js-cookie'

const setSessionCookie = (session) => {
  cookie.remove('tg-session');
  cookie.set('tg-session', session);
}

const getSessionCookie = () => {
  const sessionCookie = cookie.get('tg-session');
  if (sessionCookie === undefined) {
    return {}
  } else {
    // return JSON.parse(sessionCookie)
    return sessionCookie
  }
}


const SessionContext = createContext(getSessionCookie());

export { setSessionCookie, getSessionCookie, SessionContext }

