import { useState, useEffect, forwardRef, useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import DataTable from './DataTable'
import serviceProveedores from '../../services/proveedores'
import FormProveedores from '../../components/FormProveedores'
import MuiAlert from '@mui/material/Alert'
import { CityContext } from '../../CiudadContext/CiudadContext'

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
    id: 'nitProveedor',
    numeric: true,
    label: 'Nit Proveedor'
  },
  {
    id: 'nombreProveedor',
    numeric: false,
    label: 'Nombre Proveedor'
  },
  {
    id: 'direccionProveedor',
    numeric: false,
    label: 'Dirección Proveedor'
  },
  {
    id: 'ciudadProveedor',
    numeric: false,
    label: 'Ciudad Proveedor'
  },
  {
    id: 'telefonoProveedor',
    numeric: false,
    label: 'Teléfono Proveedor'
  }
]

const DataTableProveedores = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])
  const [flagToUpdate, setFlagToUpdate] = useState(false)
  const [message, setMessage] = useState({ open: false, severity: '', message: '' })
  const city = useContext(CityContext)

  useEffect(() => {
    serviceProveedores.getAll(city.state.portProveedores).then(data => setData(data))
    setLoading(false)
  }, [flagToUpdate])

  useEffect(() => {
    setFilteredData(data.filter((x) => Object.values(x).toString().toLowerCase().includes(search.toLowerCase())))
  }, [search, data])

  const deleteProveedor = (arrayToDelete) => {
    const promises = []
    arrayToDelete.forEach(x => {
      promises.push(
        serviceProveedores.deleteProveedor(city.state.portProveedores, x)
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
    title={'Gestión de proveedores'}
    data={filteredData}
    headCells={headCells}
    search={search}
    setSearch={setSearch}
    selected={selected}
    setSelected={setSelected}
    form={<FormProveedores flagToUpdate={flagToUpdate} setFlagToUpdate={setFlagToUpdate} />}
    deleteFunction={deleteProveedor}
    />
    </>
  )
}

export default DataTableProveedores
