import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from './DataTable'

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

const handleGetClientes = async () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.get(
    'http://localhost:8083/api/v1/clientes',
    { headers }
  )
  return data
}

const DataTableTest = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    handleGetClientes().then(data => setData(data))
    setLoading(false)
  }, [])

  useEffect(() => {
    setFilteredData(data.filter((x) => Object.values(x).toString().toLowerCase().includes(search.toLowerCase())))
  }, [search, data])

  if (loading) {
    return (
      <p>Cargando...</p>
    )
  }
  return (
<>
<DataTable
title={'Mi DataTable'}
data={filteredData}
headCells={headCells}
search={search}
setSearch={setSearch}
selected={selected}
setSelected={setSelected}
/>
</>
  )
}

export default DataTableTest
