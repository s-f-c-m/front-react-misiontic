import "./App.css";
import { Switch, Route, Link, Routes } from 'react-router-dom'
import { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import Content from "./components/Content";
import MainBox from "./components/MainBox";
import Title from "./components/Title";
import LoginBox from "./components/LoginBox";
import ReadCsv from './components/ReadCsv'
import ButtonTheme from './components/ButtonTheme'
import FormClientes from './components/FormClientes'
import ProtectedRoute from './utils/ProtectedRoute'
import { SessionProvider } from './auth/session'
import ResponsiveDrawer from './components/sidebar/sidebar/ResponsiveDrawer'

function App() {

  const slideCard = useRef();
  var tl = gsap.timeline();

  useEffect(() => {
    tl.fromTo('.slidingCard', { x: 0 }, { x: -240, duration: 1.5 });
  }, []);

  return (
    <Content>
      <SessionProvider>
        <Routes>
          <Route path='/' element={
            <MainBox >
              <ButtonTheme />
              <Title>Tienda Genérica</Title>
              <LoginBox slideCard={slideCard}>Bienvenido</LoginBox>
            </MainBox>
          } />

          <Route path='/productos' element={
            <ProtectedRoute>
              <ResponsiveDrawer>
                <ReadCsv />
              </ResponsiveDrawer>
            </ProtectedRoute>
          } />
          <Route path='/clientes' element={
            <ProtectedRoute>
              <ResponsiveDrawer>
                <FormClientes />
              </ResponsiveDrawer>
            </ProtectedRoute>
          } />
        </Routes>
      </SessionProvider>
    </Content>
  );
}

export default App;
