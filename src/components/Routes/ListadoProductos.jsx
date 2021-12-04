import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Input } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
// import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
// import { useState } from 'react'
// import axios from 'axios'

export default function ListadoProductos ({ listado, funcionEliminar, ...props }) {
  return <>

        {

            listado.map((producto, index) => {
              return <>
                    <form>
                        <Box sx={{ flexGrow: 1, margin: '20px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6} md={0.5}>
                                    <label name="consecutivo">{index + 1}</label>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Input value = {producto.key} margin="normal" size="small" disabled />
                                </Grid>
                                <Grid item xs={6} md={1}>

                                </Grid>
                                <Grid item xs={6} md={3.25}>
                                    <Input value={producto.data.nombre} margin="normal" size="small" disabled />
                                </Grid>
                                <Grid item xs={6} md={1.5}>
                                    <Input type="number" value = {producto.data.cantidad} margin="normal" size="small" disabled />
                                </Grid>
                                <Grid item xs={6} md={2.25}>
                                    <Input value = {producto.data.totalProducto} startAdornment={<InputAdornment position="start">$</InputAdornment>} margin="normal" size="small" disabled />
                                </Grid>
                                <Grid item xs={6} md={0.75}>

                                </Grid>
                                <Grid item xs={6} md={0.75}>
                                    <IconButton id = {producto.key} value = {producto.key} type="button" size="small" component="spam" onClick = {(e) => {
                                      funcionEliminar(producto.index)
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </>
            })
        }
    </>
}

