import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable/DataTable'
import Paper from '@mui/material/Paper'
import ventas from '../services/ventas'

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

const Consolidado = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])

  const getData = async () => {
    const tBog = await ventas.totalVentas('bogota')
    const tCal = await ventas.totalVentas('cali')
    const tMed = await ventas.totalVentas('medellin')
    setData([
      {
        ciudad: 'Bogotá',
        totalVentas: Math.round(tBog * 100) / 100
      },
      {
        ciudad: 'Cali',
        totalVentas: Math.round(tCal * 100) / 100
      },
      {
        ciudad: 'Medellín',
        totalVentas: Math.round(tMed * 100) / 100
      }
    ])
  }

  useEffect(() => {
    getData()
  }, [])

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
