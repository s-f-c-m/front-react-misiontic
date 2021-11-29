import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import InputAdornment from '@mui/material/InputAdornment'
import { Input } from '@mui/material'
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
  const [valorTotalProducto, setValorTotalProducto] = useState('0') // cantidad por valor unitario (incluye IVA)
  const [totalVenta, setTotalVenta] = useState(0)
  const [currentTotal, setCurrentTotal] = useState(totalVenta)

  const valorProducto = useRef(0) // valor unitario del producto

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
          total: valorTotalProducto
        }
      }])
    valorProducto.current = 0
    setTotalVenta(currentTotal)
    setCodigoProducto('')
    setNombreProducto('')
    setCantidadProducto(0)
    setValorTotalProducto(0)
    console.log(carrito)
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


  return <>
        <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                maxWidth: 1000
              }
            }}
        >
            <Paper elevation={12} sx={{ background: 'E0F7FA', padding: '20px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <form onSubmit={handleSubmitFormCliente} ref={refForm}>
                    <Box sx={{ flexGrow: 1, margin: '20px 20px 40px 20px', justifyContent: 'center' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={3}>
                                <Input name="cedula" placeholder="Cédula del cliente"
                                    onChange={(e) => setCedula(e.target.value)} margin="normal" size="small" />
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <IconButton size="small" component="spam">
                                    <PersonSearchIcon />
                                </IconButton>
                                <button type="submit"><PersonSearchIcon /></button>
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
                                  setValorTotalProducto(e.target.value * valorProducto.current)
                                  setCantidadProducto(e.target.value)
                                  const valor = totalVenta + e.target.value * valorProducto.current
                                  setCurrentTotal(valor)
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

                <ListadoProductos listado={carrito} funcionEliminar = {(id) => eliminarProducto(id)}/>

              </TableContainer>
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
              margin: '-60px 0 0 -120px'
            }
          }}
        >
          <Paper elevation={6} >
            <TextField label="Total sin IVA:" color="info" focused id="totalVenta" name="ventaSinIVA" placeholder="total sin IVA" value={'$ ' + currentTotal} margin="dense" size="small" />
            <TextField label="IVA:" color="info" focused id="totalVenta" name="IVA" placeholder="totalVenta" value={'$ ' + currentTotal} margin="dense" size="small" />
            <TextField label="Total:" color="info" focused id="totalVenta" name="totalVenta" placeholder="totalVenta" value={'$ ' + currentTotal} margin="dense" size="small" />
          </Paper>
        </Box>
    </>
}
