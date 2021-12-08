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
import { CityProvider } from './CiudadContext/CiudadContext'
import ResponsiveDrawer from './components/sidebar/sidebar/ResponsiveDrawer'
import FormVentas from './components/Routes/FormVentas'
import Clientes from './pages/Clientes'
import Usuarios from './pages/Usuarios'
import Reportes from './pages/Reportes'
import Ciudades from './pages/Ciudades'
import Proveedores from './pages/Proveedores'

function App () {
  const slideCard = useRef()
  const tl = gsap.timeline()

  useEffect(() => {
    tl.fromTo('.slidingCard', { x: 0 }, { x: -240, duration: 1.5 })
  }, [])

  return (
    <Content>
      <SessionProvider>
        <CityProvider>
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
            <Route path='/proveedores' element={
              <ProtectedRoute>
                <ResponsiveDrawer>
                  <Proveedores />
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
              <ProtectedRoute>
                <ResponsiveDrawer>
                  <FormVentas />
                </ResponsiveDrawer>
              </ProtectedRoute>
            } />
            <Route path='/reportes' element={
              <ProtectedRoute>
                <ResponsiveDrawer>
                  <Reportes />
                </ResponsiveDrawer>
              </ProtectedRoute>
            } />
            <Route path='/Ciudades' element={
            <Ciudades/>
            } />
          </Routes>
        </CityProvider>
      </SessionProvider>
    </Content>
  )
}

export default App
