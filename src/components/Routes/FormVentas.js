import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import InputAdornment from '@mui/material/InputAdornment'
import { Button, Input } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import ListadoProductos from './ListadoProductos'
import TableContainer from '@mui/material/TableContainer'
// import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
// import Fab from '@mui/material/Fab'


export default function FormVentas (props) {
  /// / scripts para buscar el cliente:
  const [cedula, setCedula] = useState()
  const [name, setName] = useState('')

  const handleSubmitFormCliente = async (e) => {
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const { data } = await axios.get(
        'http://localhost:8083/api/v1/clientes/' + cedula,
        { headers }
      )
      setName(data.nombreCliente)
    } catch {
      alert('cliente no encontrado')
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

  // console.log("---cantidad del producto:" + cantidadProducto)
  // console.log("---valor del producto" + valorProducto.current)
  // console.log("---total: " + cantidadProducto * valorProducto.current)

  // const handleSumbitVenta = (e) => {
  //   e.preventDefault()
  //   // console.log(e)
  //   if (e.target.btnVentaProducto.value === 'buscarProducto') {
  //     buscarProducto()
  //   }
  // }

  const buscarProducto = async (e) => {
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const { data } = await axios.get(
        'http://localhost:8085/api/v1/productos/' + codigoProducto,
        { headers }
      )
      setNombreProducto(data.nombreProducto)
      ivaProducto.current = data.ivaCompra
      valorProducto.current = data.precioVenta
    } catch {
      alert('producto no encontrado')
    }
  }

  /// /Carrito:

  const [carrito, setCarrito] = useState([])

  const addProducto = () => {
    setCarrito([...carrito,
      {
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

  // const listaPrueba = [
  //   {
  //     key: 777,
  //     data: {
  //       nombre: 'nombre',
  //       cantidad: '7',
  //       total: '7777'
  //     }
  //   }
  // ]

  console.log({ codigoProducto })

  const refForm = useRef()
  console.log(refForm)

  // Eliminar producto del carrito:
  const eliminarProducto = (id) => {
    const newCarrito = carrito.filter((product) => product.key !== id)
    setCarrito(newCarrito)
  }

  // Registrar Venta y detalleVenta:

  const registrarVenta = async () => {
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

    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      await axios.post(
        'http://localhost:8087/api/v1/detalleVentas/',
        JSON.stringify(listaDetalleVenta),
        { headers }
      )
    } catch {
      alert('no se pudo ingresar los detalles de la venta')
    }

    try {
      await axios.post(
        'http://localhost:8087/api/v1/ventas/',
        JSON.stringify({
          cedula_cliente: cedula,
          detalle_venta: listaDetalleVenta,
          total_venta: valorTotalVenta,
          ivaventa: ivaVenta,
          valor_venta: valorTotalVenta + ivaVenta
        }),
        { headers }
      )
      alert('venta registrada con éxito')
    } catch {
      alert('no se pudo ingresar la venta')
    }

    setvalorTotalVenta(0)
    setIvaVenta(0)
  }


  return <>
        <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                maxWidth: 1000,
                height: 450
              }
            }}
        >
            <Paper elevation={12} sx={{ background: 'E0F7FA', padding: '20px' }}>
                <form ref={refForm}>
                    <Box sx={{ flexGrow: 1, margin: '20px 20px 40px 20px', justifyContent: 'center' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={3}>
                                <Input name="cedula" placeholder="Cédula del cliente"
                                    onChange={(e) => setCedula(e.target.value)} margin="normal" size="small" />
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <IconButton type = "button" size="small" component="spam" onClick = {handleSubmitFormCliente}>
                                    <PersonSearchIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Input name="nombre" placeholder="Nombre del cliente" value={name} margin="normal" size="small" />
                            </Grid>
                        </Grid>
                        <Grid item xs={6} md={3} style={{ marginLeft: 'auto' }}>
                        </Grid>
                    </Box>
                </form>

                <form>
                    <Box sx={{ flexGrow: 1, margin: '20px' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={0.5}>
                                    <label name="consecutivo">#</label>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Input name="codigoProducto" placeholder="Código del Producto" value = {codigoProducto}
                                    onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" required/>
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <IconButton type="button" size="small" component="spam" onClick={buscarProducto}>
                                    <SearchIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} md={3.25}>
                                <Input name="nombreProducto" placeholder="Producto" value={nombreProducto} margin="normal" size="small" />
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
                                }} required/>
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
                <ListadoProductos listado={carrito} funcionEliminar = {(id) => eliminarProducto(id)}/>
              </TableContainer>

                <Box sx={{ flexGrow: 1, margin: '20px 40px 0 0' }}>
                  <Grid container spacing={1}>
                    <Grid item style={{ marginLeft: 'auto' }} >
                      <Button onClick = { registrarVenta }>
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
