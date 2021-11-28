import { useState, useEffect, forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import DataTable from './DataTable'
import serviceClientes from '../../services/clientes'
import FormClientes from '../../components/FormClientes'
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
    id: 'cedulaCliente',
    numeric: true,
    label: 'Cédula Cliente'
  },
  {
    id: 'direccionCliente',
    numeric: false,
    label: 'Dirección Cliente'
  },
  {
    id: 'emailCliente',
    numeric: false,
    label: 'Correo Cliente'
  },
  {
    id: 'nombreCliente',
    numeric: false,
    label: 'Nombre Cliente'
  },
  {
    id: 'telefonoCliente',
    numeric: false,
    label: 'Teléfono Cliente'
  }
]

const DataTableClientes = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])
  const [flagToUpdate, setFlagToUpdate] = useState(false)
  const [message, setMessage] = useState({ open: false, severity: '', message: '' })

  useEffect(() => {
    serviceClientes.getAll().then(data => setData(data))
    setLoading(false)
  }, [flagToUpdate])

  useEffect(() => {
    setFilteredData(data.filter((x) => Object.values(x).toString().toLowerCase().includes(search.toLowerCase())))
  }, [search, data])

  const deleteCliente = (arrayToDelete) => {
    const promises = []
    arrayToDelete.forEach(x => {
      promises.push(
        serviceClientes.deleteCliente(x)
      )
    })
    Promise.all(promises).then(() => {
      setMessage({ open: true, severity: 'success', message: 'Registros eliminados satisfactoriamente' })
      // alert('registros eliminados')
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
    title={'Gestión de Clientes'}
    data={filteredData}
    headCells={headCells}
    search={search}
    setSearch={setSearch}
    selected={selected}
    setSelected={setSelected}
    form={<FormClientes flagToUpdate={flagToUpdate} setFlagToUpdate={setFlagToUpdate} />}
    deleteFunction={deleteCliente}
    />
    </>
  )
}

export default DataTableClientes
