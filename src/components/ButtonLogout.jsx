import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ThemeContext } from '../theme/ThemeContext'
import cookie from 'js-cookie'

const ButtonThemeWrapper = styled.button`
border-radius: 50%;
outline: none;
background-color: white;
border: none;
font-size: 15px;
aspect-ratio:1;
color: white;
background-color: ${(props) => props.theme.mainColor2};
align-self: flex-end;
margin-right: 25px;
display: flex;
align-items: center;
padding: 5px 10px;
transition: all 0.5 ease;

&:focus{
  outline: none;
}
`
const ButtonLogout = ({ style }) => {
  const theme = useContext(ThemeContext)

  const handleLogout = () => {
    cookie.remove('tg-session')
    nav('/')
  }
  const nav = useNavigate()

  return (
    <ButtonThemeWrapper style={style} theme={theme.state} onClick={handleLogout}>
      <i className='fa fa-sign-out' aria-hidden="true"></i>
    </ButtonThemeWrapper>
  )
}

export default ButtonLogout
