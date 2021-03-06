import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useState, useRef, useContext } from 'react'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import { Button, Input } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import ListadoProductos from './ListadoProductos'
import TableContainer from '@mui/material/TableContainer'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import ventasServices from '../../services/ventas'
import productosService from '../../services/productos'
import clientesService from '../../services/clientes'
import FormHelperText from '@mui/material/FormHelperText'
import AlertPopup from '../AlertPopup'
import { CityContext } from '../../CiudadContext/CiudadContext'

export default function FormVentas (props) {
  /// / scripts para buscar el cliente:
  const [cedula, setCedula] = useState()
  const [name, setName] = useState('')
  const [message, setMessage] = useState({ open: false, severity: '', message: '' })
  const city = useContext(CityContext)

  const handleSubmitFormCliente = async (e) => {
    e.preventDefault()
    if (refFormCliente.current[0].value.trim() === '') {
      setMensajeCedula('Campo requerido')
    } else {
      setMensajeCedula('')
      clientesService.getCliente(city.state.portClientes, cedula).then((data) => {
        setName(data.nombreCliente)
        setMensajeCliente('')
      }).catch(() => {
        setMessage({ open: true, severity: 'error', message: 'Cliente no encontrado' })
      })
    }
  }

  /// / Scripts para ventas

  const [codigoProducto, setCodigoProducto] = useState()
  const [nombreProducto, setNombreProducto] = useState('')
  const [cantidadProducto, setCantidadProducto] = useState(0)
  const [valorTotalProducto, setValorTotalProducto] = useState(0) // cantidad X valor unitario (no incluye IVA)
  const [totalIvaProducto, setTotalIvaProducto] = useState(0) // cantidad X (valorProducto * ivaProducto/100)
  const [ivaVenta, setIvaVenta] = useState(0)
  const [valorTotalVenta, setvalorTotalVenta] = useState(0) // valor total de la venta hasta el momento sin IVA

  // estados Auxiliares:
  const [currentTotal, setCurrentTotal] = useState(valorTotalVenta) // valor para mostrar en pantalla sin IVA
  const [currentTotalIvaVenta, setCurrentTotalIvaVenta] = useState(ivaVenta)

  const valorProducto = useRef(0) // valor unitario del producto sin IVA
  const ivaProducto = useRef(0)

  const buscar = async (e) => {
    e.preventDefault()
    if (refFormProducto.current[0].value.trim() === '') {
      setMensajeCodigo('Campo requerido')
    } else {
      setMensajeCodigo('')
      try {
        const data = await productosService.getProducto(city.state.portProductos, codigoProducto)
        console.log(data)
        setNombreProducto(data.nombreProducto)
        ivaProducto.current = data.ivaCompra
        valorProducto.current = data.precioVenta
        setMensajeProducto('')
      } catch {
        setMessage({ open: true, severity: 'error', message: 'Producto no encontrado' })
      }
    }
  }

  /// /Carrito:

  const [carrito, setCarrito] = useState([])

  const addProducto = () => {
    if (refFormProducto.current[1].value.trim() === '') {
      setMensajeProducto('Campo requerido')
    } else if (refFormProducto.current[2].value <= 0) {
      setMensajeCantidad('No v??lido')
    } else {
      setMensajeProducto('')
      setMensajeCantidad('')
      setCarrito([...carrito,
        {
          index: carrito.length += 1,
          key: codigoProducto,
          data: {
            nombre: nombreProducto,
            cantidad: cantidadProducto,
            totalProducto: valorTotalProducto,
            valorTotalIVAdelProducto: totalIvaProducto,
            valorVentaProducto: valorTotalProducto + totalIvaProducto
          }
        }])

      valorProducto.current = 0
      ivaProducto.current = 0
      setvalorTotalVenta(currentTotal)
      setIvaVenta(currentTotalIvaVenta)
      setTotalIvaProducto(0)
      setCodigoProducto('')
      setNombreProducto('')
      setCantidadProducto(0)
      setValorTotalProducto(0)
    }
  }

  // Eliminar producto del carrito:
  const eliminarProducto = async (index) => {
    const newCarrito = await carrito.filter((product) => product.index !== index)
    setCarrito(newCarrito)
    const productoEliminado = await (carrito.filter((product) => product.index === index))[0]
    await setCurrentTotal(currentTotal - productoEliminado.data.totalProducto)
    await setCurrentTotalIvaVenta(currentTotalIvaVenta - productoEliminado.data.valorTotalIVAdelProducto)
    setvalorTotalVenta(valorTotalVenta - productoEliminado.data.totalProducto)
    setIvaVenta(ivaVenta - productoEliminado.data.valorTotalIVAdelProducto)
  }

  // Registrar Venta y detalleVenta:

  const registrar = () => {
    if (
      refFormCliente.current[1].value.trim() === ''
    ) {
      setMensajeCliente('Nombre requerido')
    } else if (carrito.length === 0) {
      setMessage({ open: true, severity: 'error', message: 'Debe ingresar al menos un producto' })
    } else {
      setMensajeCliente('')
      const listaDetalleVenta = []
      carrito.map(prod => {
        listaDetalleVenta.push({
          codigo_producto: prod.key,
          cantidad_producto: prod.data.cantidad,
          valor_total: prod.data.totalProducto,
          valoriva: prod.data.valorTotalIVAdelProducto,
          valor_venta: prod.data.valorVentaProducto
        })
        return 0
      })

      // ventasServices.registrarDetalleVentas(listaDetalleVenta)

      ventasServices.registrarVenta(city.state.portVentas, {
        cedula_cliente: cedula,
        detalle_venta: listaDetalleVenta,
        total_venta: valorTotalVenta,
        ivaventa: ivaVenta,
        valor_venta: valorTotalVenta + ivaVenta
      }).then(() => {
        setMessage({ open: true, severity: 'success', message: 'Venta registrada con ??xito' })
      }).catch(() => {
        setMessage({ open: true, severity: 'error', message: 'Error al registrar la venta' })
      }).finally(() => {
        setvalorTotalVenta(0)
        setIvaVenta(0)
        setCarrito([])
        setCedula('')
        setName('')
      })
    }
  }

  // ================================================== V A L I D A C I O N E S : ==========================================================

  const refFormCliente = useRef()
  const refFormProducto = useRef()

  // Mensajes para los helperTexts: ========================

  const [mensajeCedula, setMensajeCedula] = useState('')
  const [mensajeCodigo, setMensajeCodigo] = useState('')
  const [mensajeCantidad, setMensajeCantidad] = useState('')
  const [mensajeCliente, setMensajeCliente] = useState('')
  const [mensajeProducto, setMensajeProducto] = useState('')

  return <>
      <AlertPopup message={message} setMessage={setMessage}/>
        <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                maxWidth: 1000,
                height: 470
              }
            }}
        >
            <Paper elevation={12} sx={{ background: 'E0F7FA', padding: '20px' }}>
                <form ref={refFormCliente}>
                    <Box sx={{ flexGrow: 1, margin: '20px 20px 40px 20px', justifyContent: 'center' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={3}>
                              <FormControl >
                                <Input name="cedula" placeholder="C??dula del cliente"
                                  onChange={(e) => setCedula(e.target.value)} margin="normal" size="small" inputProps = {{ min: '1', pattern: '[0-9]*' }}/>
                                <FormHelperText error id="my-helper-text">{mensajeCedula}</FormHelperText>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} md={1}>
                              <FormControl >
                                  <IconButton type = "submit" size="small" component="spam" onClick = {handleSubmitFormCliente}>
                                      <PersonSearchIcon />
                                  </IconButton>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Input name="nombre" placeholder="Nombre del cliente" value={name} margin="normal" size="small" />
                                <FormHelperText error id="my-helper-text">{mensajeCliente}</FormHelperText>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} md={3} style={{ marginLeft: 'auto' }}>
                        </Grid>
                    </Box>
                </form>

                <form ref = {refFormProducto}>
                    <Box sx={{ flexGrow: 1, margin: '20px' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={0.5}>
                                    <label name="consecutivo">#</label>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Input name="codigoProducto" placeholder="C??digo del Producto" value = {codigoProducto}
                                    onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" />
                                <FormHelperText error id="my-helper-text">{mensajeCodigo}</FormHelperText>
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <IconButton type="button" size="small" component="spam" onClick={buscar}>
                                    <SearchIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} md={3.25}>
                                <Input name="nombreProducto" placeholder="Producto" value={nombreProducto} margin="normal" size="small" />
                                <FormHelperText error id="my-helper-text">{mensajeProducto}</FormHelperText>
                            </Grid>
                            <Grid item xs={6} md={1.5}>
                                <Input name="cantidad" type="number" placeholder="cantidad" margin="normal" size="small" pattern='[0-9]*' value = {cantidadProducto} onChange={(e) => {
                                  setCantidadProducto(e.target.value)
                                  const totalProductoSinIVA = e.target.value * valorProducto.current
                                  const totalIVA = totalProductoSinIVA * ivaProducto.current / 100
                                  setValorTotalProducto(totalProductoSinIVA)
                                  setTotalIvaProducto(totalIVA)
                                  setCantidadProducto(e.target.value)
                                  const valorVentaSinIVA = valorTotalVenta + totalProductoSinIVA
                                  const totalIvaVenta = ivaVenta + totalIVA
                                  setCurrentTotal(valorVentaSinIVA)
                                  setCurrentTotalIvaVenta(totalIvaVenta)
                                }} inputProps = {{ min: '1' }}/>
                                <FormHelperText error id="my-helper-text">{mensajeCantidad}</FormHelperText>
                            </Grid>
                            <Grid item xs={6} md={2.25}>
                                <Input name="Total" placeholder="Total" value={valorTotalProducto} startAdornment={<InputAdornment position="start">$</InputAdornment>} margin="normal" size="small" />
                            </Grid>
                            <Grid item xs={6} md={0.75}>

                            </Grid>
                            <Grid item xs={6} md={0.75}>
                                <IconButton type="submit" size="small" component="spam" onClick={addProducto}>
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </form>

                <TableContainer sx={{ height: 200 }}>
                <ListadoProductos listado={carrito} funcionEliminar = {(index) => eliminarProducto(index)}/>
              </TableContainer>

                <Box sx={{ flexGrow: 1, margin: '20px 40px 0 0' }}>
                  <Grid container spacing={1}>
                    <Grid item style={{ marginLeft: 'auto' }} >
                      <Button onClick = { registrar } component = 'spam'>
                        Aceptar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
            </Paper>

        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 200,
              maxHeight: 175,
              padding: 1,
              margin: '-75px 0 0 -280px'
            }
          }}
        >
          <Paper elevation={6} >
            <TextField label="Total sin IVA:" color="secondary" name="ventaSinIVA" placeholder="total sin IVA" value={'$ ' + currentTotal} margin="dense" size="small" />
            <TextField label="IVA:" color="secondary" name="IVA" placeholder="valorTotalVenta" value={'$ ' + currentTotalIvaVenta} margin="dense" size="small" />
            <TextField label="Total:" color="warning" focused id="valorTotalVenta" name="valorTotalVenta" placeholder="valorTotalVenta" value={'$ ' + (currentTotal + currentTotalIvaVenta)} margin="dense" size="small" />
          </Paper>
        </Box>
    </>
}
