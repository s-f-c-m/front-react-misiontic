import { useRef } from 'react'
import Input from './Input'
import Button from './Button'
import useLoadCsv from '../hooks/useLoadCsv'
import BasicTable from './DataTable/BasicTable'
import productosService from '../services/productos'

const ReadCsv = () => {
  const [csvArray, loadCsv, clearCsvArray] = useLoadCsv()
  const inputFile = useRef()

  const clearTable = () => {
    clearCsvArray()
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
    console.log(csvArray)
    productosService.postProductos(csvArray).then(() => {
      alert('productos cargados exitosamente')
    }).catch(() => {
      alert('error al cargar uno o más productos')
    }).finally(() => {
      clearTable()
    })
  }

  const styles = {
    form: {
      display: 'flex',
      gap: '5px'
    }
  }

  return (
    <div>
      <form id="csv-form" style={styles.form}>
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
      </form>

      {csvArray.length > 0 && (
        <>
          <BasicTable data={csvArray} headers={headers}/>
          <Button onClick={handleSubmit}>
            Enviar
          </Button>
        </>
      )}
    </div>
  )
}

export default ReadCsv
