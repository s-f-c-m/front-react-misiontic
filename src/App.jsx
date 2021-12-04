import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Content from './components/Content'
import MainBox from './components/MainBox'
import Title from './components/Title'
import LoginBox from './components/LoginBox'
import ReadCsv from './components/ReadCsv'
import ButtonTheme from './components/ButtonTheme'
import ProtectedRoute from './utils/ProtectedRoute'
import { SessionProvider } from './auth/session'
import ResponsiveDrawer from './components/sidebar/sidebar/ResponsiveDrawer'
import FormVentas from './components/Routes/FormVentas'
import Clientes from './pages/Clientes'
import Usuarios from './pages/Usuarios'
import reporteUtils from './utils/reportes'

function App () {
  const slideCard = useRef()
  const tl = gsap.timeline()

  useEffect(() => {
    tl.fromTo('.slidingCard', { x: 0 }, { x: -240, duration: 1.5 })
  }, [])

  // prueba reportes:
  const pruebaReportes = async () => {
    const data = await reporteUtils.ventasPorCliente()
    console.log('Reporte ventas por CLiente: ' + JSON.stringify(data))
  }

  pruebaReportes()

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
          <Route path='/dev' element={
            <ResponsiveDrawer>
            <Clientes />
            </ResponsiveDrawer>
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
                <Clientes />
              </ResponsiveDrawer>
            </ProtectedRoute>
          } />
          <Route path='/usuarios' element={
            <ProtectedRoute>
              <ResponsiveDrawer>
                <Usuarios />
              </ResponsiveDrawer>
            </ProtectedRoute>
          } />
          <Route path='/ventas' element={
            <ResponsiveDrawer>
              <>
                <FormVentas />
              </>
            </ResponsiveDrawer>
          } />
        </Routes>
      </SessionProvider>
    </Content>
  )
}

export default App
