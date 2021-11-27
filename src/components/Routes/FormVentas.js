

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

        const { data } = await axios.get(
            "http://localhost:8083/api/v1/clientes/" + cedula,
            { headers }
        )

        setName(data.nombreCliente)

    }


    //// Scripts para ventas

    const [codigoProducto, setCodigoProducto] = useState()
    const [nombreProducto, setNombreProducto] = useState("")

    const handleSubmitFormVenta = async (e) => {
        e.preventDefault()
        const headers = {
            "Content-Type": "application/json"
        };

        const { data } = await axios.get(
            "http://localhost:8085/api/v1/productos/" + codigoProducto,
            { headers }
        )

        setNombreProducto(data.nombreProducto)

    }



    return <>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    maxWidth: 1000,
                    maxHeight: 800,
                },
            }}
        >
            <Paper elevation={12} sx={{ background: "E0F7FA", padding: "20px" }}>

                <form onSubmit={handleSubmitFormCliente}>
                    <Box sx={{ flexGrow: 1, margin: "20px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                    <Input name="cedula" placeholder="Cédula del cliente"
                                        onChange={(e) => setCedula(e.target.value)} margin="normal" size="small" />
                            </Grid>
                            <Grid item xs={6} md={1}>
                                    <IconButton type="submit" size="small" component="spam">
                                        <PersonSearchIcon />
                                    </IconButton>
                            </Grid>
                            <Grid item xs={6} md={8}>
                                    <Input name="nombre" placeholder="Nombre del cliente" value={name} margin="normal" size="small" />
                            </Grid>
                        </Grid>
                    </Box>
                </form>

                <Box sx={{ flexGrow: 1, margin: "20px" }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                                <Input name="codigoProducto" placeholder="Código del Producto"
                                    onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" xs={{ height: "50px" }} />
                        </Grid>
                        <Grid item xs={6} md={1}>
                                <IconButton type="button" onClick={handleSubmitFormVenta} size="small" component="spam">
                                    <SearchIcon />
                                </IconButton>
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
                                <IconButton type="submit" size="small" component="spam">
                                    <AddShoppingCartIcon />
                                </IconButton>
                        </Grid>
                        <Grid item xs={6} md={0.75}>
                                <IconButton type="submit" size="small" component="spam">
                                    <DeleteIcon />
                                </IconButton>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ flexGrow: 1 ,margin: "20px" }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                                <Input name="codigoProducto" placeholder="Código del Producto"
                                    onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" xs={{ height: "50px" }} />
                        </Grid>
                        <Grid item xs={6} md={1}>
                                <IconButton type="button" onClick={handleSubmitFormVenta} size="small" component="spam">
                                    <SearchIcon />
                                </IconButton>
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
                                <IconButton type="submit" size="small" component="spam">
                                    <AddShoppingCartIcon />
                                </IconButton>
                        </Grid>
                        <Grid item xs={6} md={0.75}>
                                <IconButton type="submit" size="small" component="spam">
                                    <DeleteIcon />
                                </IconButton>
                        </Grid>
                    </Grid>
                </Box>


            </Paper>
        </Box>

    </>
}


















