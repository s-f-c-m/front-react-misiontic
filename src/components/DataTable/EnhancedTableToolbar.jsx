import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

const EnhancedTableToolbar = (props) => {
  const { numSelected, search, setSearch, title } = props

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0
        ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionado(s)
        </Typography>
          )
        : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
          )}

          <input style={{ flex: '1 1 100%' }} placeholder='search' value={search} onChange={handleSearch}/>

      {(() => {
        if (numSelected > 1) {
          return (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )
        } else if (numSelected === 1) {
          return (
            <>
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton>
                  <ModeEditIcon />
                </IconButton>
              </Tooltip>
            </>
          )
        } else {
          return (
            <Tooltip title="Add">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )
        }
      })()}
    </Toolbar>
  )
}
export default EnhancedTableToolbar
