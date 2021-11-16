import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

const ProtectedRoute = ({ children }) => {

  const nav = useNavigate();
  const jwt_secret = "secret"
  const [token, setToken] = useState(cookie.get('tg-session'))
  const [validUser, setValidUser] = useState(false)

  useEffect(() => {
    if (token) {
      jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
          cookie.remove('tg-session')
          setToken(null);
          nav('/')
        }
        console.log(decoded)
        setValidUser(true)
      })
    } else {
      nav('/')
    }
  })

  return (validUser && <>{
    children
  }
  </>
  )
}

export default ProtectedRoute
