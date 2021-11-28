import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import FormBase from './FormBase'
import { login } from '../services/login'
import { setSessionCookie } from '../auth/session'

const Form = ({ setErrorMsg }) => {
  const [loading, setLoading] = useState(false)
  const [formulario, setFormulario] = useState({ user: '', password: '' })
  const nav = useNavigate()

  const handleForm = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = await login(formulario)
      setSessionCookie(token.token)
      nav('/productos')
      setLoading(false)
    } catch {
      setLoading(false)
      setFormulario({ user: '', password: '' })
      setErrorMsg('Usuario y/o contraseña incorrectos')
      setTimeout(() => {
        setErrorMsg(null)
      }, 2000)
    }
  }

  if (loading) {
    return <h2>Iniciando...</h2>
  }

  return (
    <FormBase onSubmit={(e) => handleLogin(e)}>
      <Input
        name="user"
        placeholder="Usuario"
        value={formulario.user}
        onChange={handleForm}
        required
      />
      <Input
        name="password"
        type='password'
        placeholder="Contraseña"
        value={formulario.password}
        onChange={handleForm}
        required
      />
      <Button>Ingresar</Button>
    </FormBase>
  )
}

export default Form
