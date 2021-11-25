import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import FormBase from './FormBase'
import cookie from 'js-cookie'
import loginService from '../services/login'
import { setSessionCookie } from '../auth/session'
import { SessionContext } from "../auth/session";
import jwt_decode from 'jwt-decode'
import { getSessionCookie } from "../auth/session";



const Form = ({ setErrorMsg }) => {
  const [loading, setLoading] = useState(false)
  const [formulario, setFormulario] = useState({ user: "", password: "" });
  const { userSession, setUserSession } = useContext(SessionContext)
  const nav = useNavigate();

  const handleForm = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await loginService.login(formulario)
      setSessionCookie(token.token)
      setUserSession(jwt_decode(getSessionCookie()))
      nav('/productos')
      setLoading(false)
    } catch {
      setLoading(false)
      setFormulario({ user: '', password: '' });
      setErrorMsg('Usuario y/o contraseña incorrectos')
      setTimeout(() => {
        setErrorMsg(null)
      }, 2000)
    }
  }

  if (loading) {
    return <h5>Iniciando...</h5>;
  }

  console.log(formulario)
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
  );
};

export default Form;
