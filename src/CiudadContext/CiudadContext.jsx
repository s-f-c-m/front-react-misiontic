import React, { createContext, useReducer } from 'react'

const CityContext = createContext()

const defaultCity = {
  nombre: 'Bogotá',
  portClientes: 8083,
  portProductos: 8085,
  portVentas: 8087,
  portProveedores: 8084
}

const cityReducer = (state, action) => {
  switch (action.type) {
    case 'bogota':
      return (
        {
          nombre: 'Bogotá',
          portClientes: 8083,
          portProductos: 8085,
          portVentas: 8087,
          portProveedores: 8084
        }
      )
    case 'cali':
      return (
        {
          nombre: 'Cali',
          portClientes: 8093,
          portProductos: 8095,
          portVentas: 8097,
          portProveedores: 8094
        }
      )
    case 'medellin':
      return (
        {
          nombre: 'Medellin',
          portClientes: 8103,
          portProductos: 8105,
          portVentas: 8107,
          portProveedores: 8104
        }
      )

    default:
      return state
  }
}

const CityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cityReducer, defaultCity)

  return <CityContext.Provider value={{ state, dispatch }}>{children}</CityContext.Provider>
}

export { CityContext, CityProvider }
