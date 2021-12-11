import * as React from 'react'
import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// import AccordionSummary from '../buttons/AccordionSummary'
import ButtonTheme from '../../ButtonTheme'
import { ThemeContext } from '../../../theme/ThemeContext'
import NavLink from '../menus/NavLink'
import UploadFileIcon from '@mui/icons-material/UploadFile'
// import ButtonLogout from '../../ButtonLogout'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import TableChartIcon from '@mui/icons-material/TableChart'
import GroupIcon from '@mui/icons-material/Group'
import InventoryIcon from '@mui/icons-material/Inventory'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Avatar from '@mui/material/Avatar'
import { SessionContext } from '../../../auth/session'
import { CityContext } from '../../../CiudadContext/CiudadContext'
import ProfileMenu from './ProfileMenu'

const drawerWidth = 240
function ResponsiveDrawer ({ children, window, ...props }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [session] = useContext(SessionContext)
  const city = useContext(CityContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const drawer = (
    <div>
      <Toolbar />
      {(session.roles.includes('admin') || session.roles.includes('productos')) && <NavLink link='/productos' icon={<UploadFileIcon />} >Productos</NavLink>}
      {(session.roles.includes('admin') || session.roles.includes('proveedores')) && <NavLink link='/proveedores' icon={<InventoryIcon />} >Proveedores</NavLink>}
      {(session.roles.includes('admin') || session.roles.includes('cliente')) && <NavLink link='/clientes' icon={<GroupIcon />}>Clientes</NavLink>}
      {(session.roles.includes('admin') || session.roles.includes('usuarios')) && <NavLink link='/usuarios' icon={<SupervisedUserCircleIcon />}>Usuarios</NavLink> }
      {(session.roles.includes('admin') || session.roles.includes('ventas')) && <NavLink link='/ventas' icon={<AttachMoneyIcon />}>Ventas</NavLink>}
      {(session.roles.includes('admin') || session.roles.includes('reportes')) && <NavLink link='/reportes' icon={<TableChartIcon />}>Reportes</NavLink>}
      {(session.roles.includes('admin') || session.roles.includes('reportes')) && city.state.nombre === 'Bogotá' && <NavLink link='/consolidado' icon={<AssessmentIcon />}>Consolidado</NavLink>}
      {/* <AccordionSummary /> */}
    </div>
  )
  const container = window !== undefined ? () => window().document.body : undefined
  const theme = useContext(ThemeContext)
  return (
  <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
              Tienda Genérica - Sede {city.state.nombre}
          </Typography>
          <div style={{ display: 'flex' }}>
            <ButtonTheme style={{ alignSelf: 'center' }} />
            <Avatar sx={{ bgcolor: theme.state.mainColor2 }} alt={session.sub} src='../notwork.jpg' onClick={handleClick}/>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: theme.state.secondaryColor1 }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: theme.state.secondaryColor1 }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {children}
    </Box>
    <ProfileMenu
       anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        />
    </>
  )
}
ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
}
export default ResponsiveDrawer
