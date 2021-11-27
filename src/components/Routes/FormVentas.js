

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
            <Paper elevation={3}>
                <Paper elevation={3} >

                    <form onSubmit={handleSubmitFormCliente}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>

                                    <Input name="cedula" placeholder="Cédula del cliente"
                                        onChange={(e) => setCedula(e.target.value)} margin="normal" size="small" />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button type="submit">Buscar</Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Input name="nombre" placeholder="Nombre del cliente" value={name} margin="normal" size = "small" />
                                </Grid>

                            </Grid>




                        </Box>
                    </form>
                </Paper>



                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Código</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                                <StyledTableCell >Producto</StyledTableCell>
                                <StyledTableCell >Cantidad</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                                <StyledTableCell >Total</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell>
                                    <Input name="codigoProducto" placeholder="Código del Producto"
                                        onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button type="button" onClick={handleSubmitFormVenta} size="small">Buscar</Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Input name="nombreProducto" placeholder="Producto" value={nombreProducto} margin="normal" size="small" />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Input name="cantidad" type="number" placeholder="cantidad" margin="normal" size="small" pattern='[0-9]*' />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button type="submit" size="small">Calcular</Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Input name="Total" placeholder="Total" startAdornment={<InputAdornment position="start">$</InputAdornment>} margin="normal" size="small" />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <Item>
                                <TextField name="cedula" placeholder="Cédula del cliente"
                                    onChange={(e) => setCedula(e.target.value)} margin="dense" />
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={1}>
                            <Item>
                                <Button type="submit">Buscar</Button>
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <Item>
                                <TextField name="nombre" placeholder="Nombre del cliente" value={name} margin="dense" />
                            </Item>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} md={2}>
                            <Item>
                                <Input name="codigoProducto" placeholder="Código del Producto"
                                    onChange={(e) => setCodigoProducto(e.target.value)} margin="normal" size="small" xs={{ height: "50px" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={1}>
                            <Item>
                                <Button type="button" onClick={handleSubmitFormVenta} size="small" variant="text">Buscar</Button>
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Item>
                                <Input name="nombreProducto" placeholder="Producto" value={nombreProducto} margin="normal" size="small" />
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={1}>
                            <Item>
                                <Input name="cantidad" type="number" placeholder="cantidad" margin="normal" size="small" pattern='[0-9]*' />
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={1}>
                            <Item>
                                <Button type="submit" size="small" variant="text">Calcular</Button>
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Item>
                                <Input name="Total" placeholder="Total" startAdornment={<InputAdornment position="start">$</InputAdornment>} margin="normal" size="small" />
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={1}>
                            <Item>
                                eliminar
                            </Item>
                        </Grid>
                    </Grid>
                </Box>


            </Paper>
        </Box>

    </>
}


















