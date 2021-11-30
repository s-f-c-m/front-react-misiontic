import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

export default function BasicTable (props) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { headers, data } = props

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {headers.map((headCell) => (
            <TableCell
            key={headCell.id}
            >{headCell.label}
            </TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            const k = []
            Object.entries(row).forEach((key, value) => k.push(key[1]))
            return (<TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
          { k.map((x, i) => <TableCell key={i} align='center'>{x}</TableCell>) }
          </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[5, 10]}
      component="div"
      count={data.length}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage='Filas por página'
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
