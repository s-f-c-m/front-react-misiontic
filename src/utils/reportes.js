import clienteServices from '../services/clientes'
import ventasServices from '../services/ventas'

const ventasPorCliente = async (portC, portV) => {
  const arrayClientes = await clienteServices.getAll(portC)
  const arrayVentas = await ventasServices.getAllVentas(portV)
  const reporte = []

  arrayClientes.map(cliente => {
    let totalVentasCliente = 0
    arrayVentas.map(venta => {
      if (venta.cedula_cliente === cliente.cedulaCliente) {
        totalVentasCliente += venta.valor_venta
      }
      return 0
    })
    reporte.push({
      cedula: cliente.cedulaCliente,
      nombre: cliente.nombreCliente,
      totalVentas: totalVentasCliente
    })
    return 0
  })

  return reporte
}

export default { ventasPorCliente }

