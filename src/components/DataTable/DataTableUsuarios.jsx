import { useState, useEffect, forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import DataTable from './DataTable'
import serviceUsuarios from '../../services/usuarios'
import FormUsuarios from '../../components/FormUsuarios'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AlertPopup = ({ message, setMessage }) => {
  const vertical = 'top'
  const horizontal = 'center'
  return (
    <div>
      <Snackbar
           anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        open={message.open}
        onClose={() => setMessage({ open: false, message: '' })}
          >
          <Alert severity={message.severity} sx={{ width: '100%' }}>
            {message.message}
          </Alert>

      </Snackbar>
    </div>
  )
}

const headCells = [
  {
    id: 'user',
    numeric: false,
    label: 'Usuario'
  },
  {
    id: 'name',
    numeric: false,
    label: 'Nombre'
  },
  // {
  //   id: 'password',
  //   numeric: false,
  //   label: 'Contraseña'
  // },
  {
    id: 'email',
    numeric: false,
    label: 'Correo'
  },
  {
    id: 'roles',
    numeric: false,
    label: 'Roles'
  }
]

const DataTableUsuarios = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])
  const [flagToUpdate, setFlagToUpdate] = useState(false)
  const [message, setMessage] = useState({ open: false, severity: '', message: '' })

  useEffect(() => {
    serviceUsuarios.getAll().then(data => setData(data))
    setLoading(false)
  }, [flagToUpdate])

  useEffect(() => {
    setFilteredData(data.filter((x) => Object.values(x).toString().toLowerCase().includes(search.toLowerCase())))
  }, [search, data])

  const deleteUsuario = (arrayToDelete) => {
    const promises = []
    arrayToDelete.forEach(x => {
      promises.push(
        serviceUsuarios.deleteUsuario(x)
      )
    })
    Promise.all(promises).then(() => {
      setMessage({ open: true, severity: 'success', message: 'Registros eliminados satisfactoriamente' })
    }).catch(() => {
      setMessage({ open: true, severity: 'error', message: 'Error al eliminar uno o más registros' })
    }).finally(() => {
      setFlagToUpdate(!flagToUpdate)
      setSelected([])
    })
  }

  if (loading) {
    return (
      <p>Cargando...</p>
    )
  }
  return (
    <>
      <AlertPopup message={message} setMessage={setMessage}/>
      <DataTable
    title={'Gestión de Usuarios'}
    data={filteredData}
    headCells={headCells}
    search={search}
    setSearch={setSearch}
    selected={selected}
    setSelected={setSelected}
    form={<FormUsuarios flagToUpdate={flagToUpdate} setFlagToUpdate={setFlagToUpdate} />}
    deleteFunction={deleteUsuario}
    />
    </>
  )
}

export default DataTableUsuarios
