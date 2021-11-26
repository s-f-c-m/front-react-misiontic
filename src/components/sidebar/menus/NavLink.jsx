import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeContext'

const LinkWrapper = styled(Link)`
  display: flex;
  text-decoration: none;
  color: white;
  &:hover{
    text-decoration: none;
    color: gray;
  }
`

const NavLink = ({ link, children, icon }) => {
  const theme = useContext(ThemeContext)
  return (
    <ListItem button key="registrarUsuario" style={{ backgroundColor: theme.state.mainColor2 }}>
      <LinkWrapper to={link}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={children} />
      </LinkWrapper>
    </ListItem>
  )
}

export default NavLink
