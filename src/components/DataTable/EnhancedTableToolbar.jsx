import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { useState, cloneElement } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background-paper',
  boder: 'none'
}

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected, search, setSearch, title, form, deleteFunction } = props
  const [formOpen, setFormOpen] = useState(false)
  const handleFormOpen = () => setFormOpen(true)
  const handleFormClose = () => setFormOpen(false)

  console.log(props.showControls)
  let showControls

  if (props.showControls === undefined) {
    showControls = true
  } else {
    showControls = props.showControls
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  let formFinal
  if (form) {
    formFinal = cloneElement(form, { selected: selected })
  } else {
    formFinal = {}
  }

  return (
    <>
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

          <input style={{ flex: '1 1 100%' }} placeholder='Buscar' value={search} onChange={handleSearch}/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
        {showControls && numSelected > 0
          ? (
              <Tooltip title="Delete">
                <IconButton onClick={() => deleteFunction(selected)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )
          : showControls && (
              <Tooltip title="Add">
                <IconButton onClick={handleFormOpen}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
          )
        }
        { showControls && numSelected === 1 &&
          (
              <Tooltip title="Edit">
                <IconButton onClick={handleFormOpen}>
                  <ModeEditIcon />
                </IconButton>
              </Tooltip>
          )
        }
          </div>
    </Toolbar>
    <Modal
      open={formOpen}
      onClose={handleFormClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
        <Box sx={style}>
        {formFinal}
        </Box>
    </Modal>
      </>
  )
}
export default EnhancedTableToolbar
