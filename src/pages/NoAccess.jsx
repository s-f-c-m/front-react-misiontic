import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const NoAccess = () => {
  const [counter, setCounter] = useState(10)
  const nav = useNavigate()

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1)
      }, 1000)
    } else {
      nav('/')
    }
  }, [counter])

  return (
    <div>
      Accesso no autorizado. Por favor inicie sesión antes de continuar.
      Saliendo en {counter} segundos.
      <Link to='/'>Clic para salir ahora</Link>
    </div>
  )
}

export default NoAccess
