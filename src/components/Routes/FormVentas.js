

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import axios from "axios";
import Divider from '@mui/material/Divider';
import Button from "./Button"


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
            <Paper elevation={3} >

                <form onSubmit={handleSubmitFormCliente}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField name="cedula" placeholder="Cédula del cliente"
                                    onChange={(e) => setCedula(e.target.value)} margin="dense" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button type="submit">Buscar</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField name="nombre" placeholder="Nombre del cliente" value={name} margin="dense" />
                            </Grid>

                        </Grid>




                    </Box>
                </form>

                <Divider />

                <form onSubmit={handleSubmitFormVenta}>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField name="codigoProducto" placeholder="Código del Producto"
                                    onChange={(e) => setCodigoProducto(e.target.value)}  margin="normal" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button type="submit">Buscar</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField name="nombreProducto" placeholder="Producto" value={nombreProducto} margin="normal" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField name="cantidad" type="numeric" placeholder="cantidad" margin="normal" />
                            </Grid>
                        </Grid>
                    </Box>


                </form>


            </Paper>
        </Box>

    </>
}







