import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable/DataTable'
import Paper from '@mui/material/Paper'
import consolidado from '../services/ventas'

const headCells = [
  {
    id: 'ciudad',
    numeric: false,
    label: 'Ciudad'
  },
  {
    id: 'totalVentas',
    numeric: false,
    label: 'Valor Total Ventas'
  }
]

const ventasData = [
  {
    ciudad: 'Bogotá',
    totalVentas: consolidado.totalVentas('bogota')
  },
  {
    ciudad: 'Cali',
    totalVentas: 6546
  },
  {
    ciudad: 'Medellín',
    totalVentas: 852255
  }
]

const Consolidado = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setData(ventasData)
  }, [ventasData])

  useEffect(() => {
    setFilteredData(data.filter((x) => Object.values(x).toString().toLowerCase().includes(search.toLowerCase())))
  }, [search, data])

  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <DataTable
            title='Consolidado de Ventas'
            data={filteredData}
            headCells={headCells}
            search={search}
            setSearch={setSearch}
            selected={selected}
            setSelected={setSelected}
            showControls={false}
            />
          <Paper variant='outlined' elevation={12} style={{ padding: 10, alignSelf: 'flex-end' }} >Total Ventas: ${data.reduce((acc, el) => acc + el.totalVentas, 0).toFixed(2)}</Paper>
  </div>
  )
}

export default Consolidado
