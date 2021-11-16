import "./App.css";
import { Switch, Route, Link, Routes } from 'react-router-dom'
import { useRef, useEffect, useState } from "react";
import { gsap } from 'gsap';
import Content from "./components/Content";
import MainBox from "./components/MainBox";
import Title from "./components/Title";
import LoginBox from "./components/LoginBox";
import ReadCsv from './components/ReadCsv'
import ButtonTheme from './components/ButtonTheme'
import FormClientes from './components/FormClientes'
import ProtectedRoute from './utils/ProtectedRoute'
import { SessionContext, getSessionCookie, setSessionCookie } from './auth/session'
import ResponsiveDrawer from './components/sidebar/sidebar/ResponsiveDrawer'
import jwt_decode from 'jwt-decode'

function App() {

  const slideCard = useRef();
  var tl = gsap.timeline();
  useEffect(() => {
    tl.fromTo('.slidingCard', { x: 0 }, { x: -240, duration: 1.5 });
  }, []);


  try {
    var userInfo = jwt_decode(getSessionCookie());
  } catch {
    userInfo = ''
  }


  const [userSession, setUserSession] = useState(userInfo);

  useEffect(() => {
    setUserSession(userInfo)
  }, []);

  return (
    <SessionContext.Provider value={{ userSession, setUserSession }}>
      <Content>
        <Routes>
          <Route path='/' element={
            <MainBox >
              <ButtonTheme />
              <Title>Tienda Genérica</Title>
              <LoginBox slideCard={slideCard}>Bienvenido</LoginBox>
            </MainBox>
          } />
          <Route path='/productos' element={
            <ResponsiveDrawer>
              <>
                <ReadCsv />
              </>
            </ResponsiveDrawer>
          } />
          <Route path='/clientes' element={
            <ResponsiveDrawer>
              <>
                <FormClientes />
              </>
            </ResponsiveDrawer>
          } />
        </Routes>
      </Content>
    </SessionContext.Provider>
  );
}

export default App;
