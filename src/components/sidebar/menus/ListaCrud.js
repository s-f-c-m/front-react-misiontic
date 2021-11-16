import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ListaCrud(){


    const funcion = () => {
        alert("Registrar Usuario")
    }

    return <>
    <List>
    <ListItem button key="registrarUsuario" onClick = {funcion}>
        <ListItemIcon>
            <PersonAddIcon/>
        </ListItemIcon>
        <ListItemText primary="Registrar" />
    </ListItem>

    <ListItem button key="consultar">
        <ListItemIcon>
            <PersonSearchIcon/>
        </ListItemIcon>
        <ListItemText primary="Consultar" />
    </ListItem>

    <ListItem button key="Modificar">
        <ListItemIcon>
            <UpdateIcon/>
        </ListItemIcon>
        <ListItemText primary="Modificar" />
    </ListItem>

    <ListItem button key="Eliminar">
        <ListItemIcon>
            <DeleteForeverIcon/>
        </ListItemIcon>
        <ListItemText primary="Eliminar" />
    </ListItem>
</List>
</>
}