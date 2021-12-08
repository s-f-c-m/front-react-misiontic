import { useRef, useContext, useEffect, useState, forwardRef } from 'react'
import Input from './Input'
import Button from './Button'
import useLoadCsv from '../hooks/useLoadCsv'
import BasicTable from './DataTable/BasicTable'
import productosService from '../services/productos'
import proveedoresService from '../services/proveedores'
import { CityContext } from '../CiudadContext/CiudadContext'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background-paper',
  boder: 'none'
}

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

const ReadCsv = () => {
  const [csvArray, loadCsv, clearCsvArray] = useLoadCsv()
  const inputFile = useRef()
  const city = useContext(CityContext)
  const [csvNoNit, setCsvNoNit] = useState([])
  const [message, setMessage] = useState({ open: false, severity: '', message: '' })
  const [formOpen, setFormOpen] = useState(false)
  const handleFormOpen = () => setFormOpen(true)
  const handleFormClose = () => setFormOpen(false)

  const clearTable = () => {
    clearCsvArray()
    setCsvNoNit([])
    inputFile.current.value = ''
  }

  const headers = [
    {
      id: 'codigoProducto',
      label: 'Código Producto'
    },
    {
      id: 'ivaCompra',
      label: 'Iva Compra'
    },
    {
      id: 'nitProveedor',
      label: 'Nit Proveedor'
    },
    {
      id: 'nombreProducto',
      label: 'Nombre del Producto'
    },
    {
      id: 'precioCompra',
      label: 'Precio Compra'
    },
    {
      id: 'precioVenta',
      label: 'Precio Venta'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (csvNoNit.length > 0) {
      setMessage({ open: true, severity: 'error', message: 'Productos con error. Verifique que los proveedores relacionados existan en el sistema' })
      return
    }

    productosService.postProductos(city.state.portProductos, csvArray).then(() => {
      setMessage({ open: true, severity: 'success', message: 'Productos Cargados Satisfactoriamente' })
    }).catch(() => {
      setMessage({ open: true, severity: 'error', message: 'Error al cargar los productos' })
    }).finally(() => {
      clearTable()
    })
  }

  useEffect(() => {
    if (csvArray.length > 0) {
      proveedoresService.getAll(city.state.portProveedores).then((data) => {
        const nits = data.map((x) => x.nitProveedor)
        console.log(nits)
        console.log(csvArray)
        const notNit = csvArray.filter((x) => !nits.includes(x.nitProveedor))
        setCsvNoNit(notNit)
      })
    }
  }, [csvArray])

  return (
    <>
    <div>
      <AlertPopup message={message} setMessage={setMessage}/>
      <form id="csv-form" style={{ display: 'flex', gap: '5px' }}>
        <Input
          style={{ color: 'white' }}
          ref={inputFile}
          type="file"
          accept=".csv"
          id="csvFile"
          onChange={loadCsv}
          onClick={clearTable}
        />
        <Button onClick={clearTable} type="button">
          Limpiar
        </Button>
        {csvNoNit.length > 0 &&
        <Button onClick={handleFormOpen} type="button">
        Ver productos con error
        </Button>
        }
      </form>

      {csvArray.length > 0 && (
        <>
          <BasicTable data={csvArray} headers={headers}/>
          <Button onClick={handleSubmit} >
            Enviar
          </Button>
        </>
      )}
    </div>
    <Modal
      open={formOpen}
      onClose={handleFormClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
        <Box sx={style}>
          <BasicTable data={csvNoNit} headers={headers}/>
        </Box>
    </Modal>
    </>
  )
}

export default ReadCsv
