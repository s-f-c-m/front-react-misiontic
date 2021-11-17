import { useState, useEffect, useContext } from "react";
import { SessionContext } from '../auth/session'
import { isAuhtenticated } from '../services/login'
import NoAccess from '../pages/NoAccess'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const loadData = async () => {
      isAuhtenticated().then(data => {
        if (data.error) {
          console.log(data.error);
          setSession({
            ...session,
            sub: ''
          })
          setLoading(false)
        } else {
          setSession({
            ...session,
            exp: data.exp,
            iat: data.iat,
            roles: data.roles,
            sub: data.sub
          })
          setLoading(false)
        }
      })
    }

    loadData();

  }, [navigate])

  if (loading) {
    return <></>
  }

  return (session.sub != '' ? <>{
    children
  }
  </> :
    <NoAccess />
  )
}

export default ProtectedRoute
