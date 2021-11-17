import * as React from 'react';
import { useContext } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccordionSummary from '../buttons/AccordionSummary';
import ButtonTheme from '../../ButtonTheme'
import { ThemeContext } from '../../../theme/ThemeContext';
import NavLink from '../menus/NavLink'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PersonIcon from '@mui/icons-material/Person';
import { SessionContext } from '../../../auth/session'

const drawerWidth = 240;

function ResponsiveDrawer({ children, window, ...props }) {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const clientesIcon = <PersonIcon />
  const productosIcon = <UploadFileIcon />
  const [session, setSession] = useContext(SessionContext)

  const drawer = (
    <div>
      <Toolbar />
      <NavLink link='/productos' icon={productosIcon} >Productos</NavLink>
      <NavLink link='/clientes' icon={clientesIcon}>Clientes</NavLink>
      {/* <Link to='/clientes'>Clientes</Link> */}
      {/* <AccordionSummary /> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const theme = useContext(ThemeContext)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ 'justifyContent': 'space-between' }}>
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
            Tienda Genérica
          </Typography>
          <ButtonTheme style={{ 'alignSelf': 'center' }} />
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: theme.state.secondaryColor1 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: theme.state.secondaryColor1 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box */}
      {/*   component="main" */}
      {/*   sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} */}
      {/* > */}

      {children}
      {/* </Box> */}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
