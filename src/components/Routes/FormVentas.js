

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import axios from "axios";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { height } from '@mui/system';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));






export default function FormVentas() {


    //// scripts para buscar el cliente:
    const [cedula, setCedula] = useState()
    const [name, setName] = useState("")



    const handleSubmitFormCliente = async (e) => {
        e.preventDefault()
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const { data } = await axios.get(
                "http://localhost:8083/api/v1/clientes/" + cedula,
                { headers }
            )
            setName(data.nombreCliente)
        }
        catch {
            alert("cliente no encontrado")
        }
    }


    //// Scripts para ventas

    const [codigoProducto, setCodigoProducto] = useState()
    const [nombreProducto, setNombreProducto] = useState("")

    
    
    const handleSumbitVenta = (e) => {
        e.preventDefault()
        console.log(e)
        if(e.target.btnVentaProducto.value === "buscarProducto"){
            buscarProducto()
        }

    }
    
    
    
    const buscarProducto = async (e) => {
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const { data } = await axios.get(
                "http://localhost:8085/api/v1/productos/" + codigoProducto,
                { headers }
            )
            setNombreProducto(data.nombreProducto)
        }
        catch {
            alert("producto no encontrado")
        }

    }



    ////Carrito:

    const [carrito, setCarrito] = useState([])
    var listadoProductos = [] 

  
    const addProducto = () => { 
       
        var consecutivo = carrito.length +1

        const producto =  <form onSubmit={handleSumbitVenta} id = {consecutivo}>
        <Box sx={{ flexGrow: 1, margin: "20px" }}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={2}>
                    <Input name="codigoProducto" placeholder="Código del Producto"
                        onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" />
                </Grid>
                <Grid item xs={6} md={1}>
                    <IconButton type="button" size="small" component="spam">
                        <SearchIcon />
                    </IconButton>
                    <button type = "submit" name = "btnVentaProducto" value = "buscarProducto" > <SearchIcon /> </button>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Input name="nombreProducto" placeholder="Producto" value={nombreProducto} margin="normal" size="small" />
                </Grid>
                <Grid item xs={6} md={1.5}>
                    <Input name="cantidad" type="number" placeholder="cantidad" margin="normal" size="small" pattern='[0-9]*' />
                </Grid>
                <Grid item xs={6} md={3}>
                    <Input name="Total" placeholder="Total" startAdornment={<InputAdornment position="start">$</InputAdornment>} margin="normal" size="small" />
                </Grid>
                <Grid item xs={6} md={0.75}>
                    <IconButton type="submit" size="small" component="spam" onClick = {addProducto}>
                        <AddShoppingCartIcon />
                    </IconButton>
                    <button type = "submit" name = "btnVentaProducto2" value = "addProducto"><AddShoppingCartIcon /></button>
                </Grid>
                <Grid item xs={6} md={0.75}>
                    <IconButton type="submit" size="small" component="spam">
                        <DeleteIcon />
                    </IconButton>
                    <button type = "submit" name = "btnVentaProducto3" value = "addProducto"><AddShoppingCartIcon /></button>

                </Grid>
            </Grid>
        </Box>
        </form>

        listadoProductos.push(producto)

        setCarrito(listadoProductos)
  
    }



    return <>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    maxWidth: 1000,
                },
            }}
        >
            <Paper elevation={12} sx={{ background: "E0F7FA", padding: "20px" }}>

                <form onSubmit={handleSubmitFormCliente}>
                    <Box sx={{ flexGrow: 1, margin: "20px 20px 40px 20px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                <Input name="cedula" placeholder="Cédula del cliente"
                                    onChange={(e) => setCedula(e.target.value)} margin="normal" size="small" />
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <IconButton size="small" component="spam" sx={{ type: "submit" }}>
                                    <PersonSearchIcon />
                                </IconButton>
                                <button type="submit"><PersonSearchIcon /></button>
                            </Grid>
                            <Grid item xs={6} md={8}>
                                <Input name="nombre" placeholder="Nombre del cliente" value={name} margin="normal" size="small" />
                            </Grid>
                        </Grid>
                    </Box>
                </form>


                {carrito.map(producto => {
                    return producto
                })}


                <form onSubmit={handleSumbitVenta}>
                <Box sx={{ flexGrow: 1, margin: "20px" }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                            <Input name="codigoProducto" placeholder="Código del Producto"
                                onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" xs={{ height: "50px" }} />
                        </Grid>
                        <Grid item xs={6} md={1}>
                            <IconButton type="button" size="small" component="spam">
                                <SearchIcon />
                            </IconButton>
                            <button type = "submit" name = "btnVentaProducto" value = "buscarProducto" > <SearchIcon /> </button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Input name="nombreProducto" placeholder="Producto" value={nombreProducto} margin="normal" size="small" />
                        </Grid>
                        <Grid item xs={6} md={1.5}>
                            <Input name="cantidad" type="number" placeholder="cantidad" margin="normal" size="small" pattern='[0-9]*' />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Input name="Total" placeholder="Total" startAdornment={<InputAdornment position="start">$</InputAdornment>} margin="normal" size="small" />
                        </Grid>
                        <Grid item xs={6} md={0.75}>
                            <IconButton type="button" size="small" component="spam" onClick = {addProducto}>
                                <AddShoppingCartIcon />
                            </IconButton>
                            <button type = "submit" name = "btnVentaProducto2" value = "addProducto"><AddShoppingCartIcon /></button>
                        </Grid>
                        <Grid item xs={6} md={0.75}>
                            <IconButton type="submit" size="small" component="spam">
                                <DeleteIcon />
                            </IconButton>
                    <button type = "submit" name = "btnVentaProducto3" value = "addProducto"><AddShoppingCartIcon /></button>

                        </Grid>
                    </Grid>
                </Box>
                </form>
              
            </Paper>
        </Box>

    </>
}


















