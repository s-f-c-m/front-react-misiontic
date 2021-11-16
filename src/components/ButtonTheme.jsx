import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../theme/ThemeContext'

const ButtonThemeWrapper = styled.button`
width: 75px;
border-radius: 100vw;
outline: none;
background-color: white;
border: none;
font-size: 25px;
// aspect-ratio:1;
color: white;
background-color: ${(props) => props.theme.mainColor2};
align-self: flex-end;
margin-right: 25px;
display: flex;
justify-content: ${(props) => props.theme.iconPosition};
align-items: center;
padding: 5px 10px;
transition: all 0.5 ease;

&:focus{
  outline: none;
}
`
const ButtonTheme = ({ style }) => {
  const theme = useContext(ThemeContext)
  const lighttheme = theme.state.light

  const handleTheme = () => {
    if (lighttheme) {
      theme.dispatch({ type: 'DARKTHEME' });
    } else {
      theme.dispatch({ type: 'LIGHTTHEME' });
    }
  }

  return (
    <ButtonThemeWrapper style={style} theme={theme.state} onClick={handleTheme}>
      <i className={theme.state.icon} aria-hidden="true"></i>
    </ButtonThemeWrapper>
  )
}

export default ButtonTheme
