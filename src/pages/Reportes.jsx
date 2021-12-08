import { useState, useEffect, useContext } from 'react'
import DataTable from '../components/DataTable/DataTable'
import serviceClientes from '../services/clientes'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ThemeContext } from '../theme/ThemeContext'
import { CityContext } from '../CiudadContext/CiudadContext'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import reporteUtils from '../utils/reportes'

const CustomToggleButtonGroup = styled(ToggleButtonGroup)`
background-color: ${(props) => props.theme.mainColor2};

&:focus{
  outline: none;
}
`
const CustomToggleButton = styled(ToggleButton)`
  &:focus{
  outline: none;
  }
`

const headCellsClientes = [
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

const headCellsVentas = [
  {
    id: 'cedula',
    numeric: false,
    label: 'Cédula Cliente'
  },
  {
    id: 'nombre',
    numeric: false,
    label: 'Nombre Cliente'
  },
  {
    id: 'totalVentas',
    numeric: false,
    label: 'Total Ventas'
  }

]

// const ventasData = [
//   {
//     cedulaCliente: 15151515,
//     nombreCliente: 'cliente 1',
//     totalVentas: 55525

//   },
//   {
//     cedulaCliente: 54765465,
//     nombreCliente: 'cliente 2',
//     totalVentas: 88888

//   },
//   {
//     cedulaCliente: 7987997,
//     nombreCliente: 'cliente 3',
//     totalVentas: 98899
//   }
// ]

const Reportes = () => {
  const [reporte, setReporte] = useState('clientes')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [headCells, setHeadCelss] = useState(headCellsClientes)
  const [title, setTitle] = useState('Reporte de Clientes')
  // const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])
  // const [message, setMessage] = useState({ open: false, severity: '', message: '' })
  const theme = useContext(ThemeContext)
  const city = useContext(CityContext)

  useEffect(() => {
    if (reporte === 'clientes') serviceClientes.getAll(city.state.portClientes).then(data => setData(data))
    if (reporte === 'ventas') {
      reporteUtils.ventasPorCliente(city.state.portClientes, city.state.portVentas).then(data => setData(data))
    }
  }, [reporte])

  useEffect(() => {
    setFilteredData(data.filter((x) => Object.values(x).toString().toLowerCase().includes(search.toLowerCase())))
  }, [search, data])

  const handleChange = (event, newReporte) => {
    switch (newReporte) {
      case 'ventas':
        setHeadCelss(headCellsVentas)
        setTitle('Ventas por Cliente')
        break
      case 'clientes':
        setHeadCelss(headCellsClientes)
        setTitle('Reporte de Clientes')
        break
      default:
        break
    }
    setReporte(newReporte)
  }

  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
    <CustomToggleButtonGroup
      value={reporte}
      exclusive
      onChange={handleChange}
      theme={theme.state}
      >
      <CustomToggleButton style={{ color: 'white' }} value='clientes'>Reporte de Clientes</CustomToggleButton>
      <CustomToggleButton style={{ color: 'white' }} value='ventas'>Ventas por Cliente</CustomToggleButton>
    </CustomToggleButtonGroup>
      {reporte !== null
        ? (
          <>
            <DataTable
            title={title}
            data={filteredData}
            headCells={headCells}
            search={search}
            setSearch={setSearch}
            selected={selected}
            setSelected={setSelected}
            showControls={false}
            />
          {reporte === 'ventas' && <Paper variant='outlined' elevation={12} style={{ padding: 10, alignSelf: 'flex-end' }} >Total Ventas: {data.reduce((acc, el) => acc + el.totalVentas, 0).toFixed(2)} $</Paper>}
          </>
          )
        : <div style={{ color: 'white' }}>Seleccione un reporte</div>
      }
  </div>
  )
}

export default Reportes
