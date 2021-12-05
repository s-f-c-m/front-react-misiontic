import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Divider from '@mui/material/Divider'
import { SessionContext } from '../../../auth/session'
import { ThemeContext } from '../../../theme/ThemeContext'
import cookie from 'js-cookie'

const ProfileMenu = ({ anchorEl, open, handleClose }) => {
  const [session] = useContext(SessionContext)
  const theme = useContext(ThemeContext)
  const nav = useNavigate()

  const handleLogout = () => {
    cookie.remove('tg-session')
    nav('/')
  }

  return (
    <Menu
 anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            bgcolor: theme.state.mainColor2,
            color: 'white',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        {session.name}
        </div>
        <Divider />
      <MenuItem>
        <EditIcon />
        Mi Perfil
        </MenuItem>
      <MenuItem>
        <VpnKeyIcon />
        Cambiar Contraseña
        </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        Logout
      </MenuItem>
    </Menu>
  )
}

export default ProfileMenu
