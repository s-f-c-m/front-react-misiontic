import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext'

const ButtonWrapper = styled.button`
transition: all 0.3s ease;
border: none;
background-color: ${(props) => props.theme.mainColor2};
padding: 10px 10px;
cursor: pointer;
font-weight: 700;
color: white;
border-radius: 5px;

&:hover{
    filter: brightness(0.80);
}
&:focus{
  outline: none;
}
`
const Button = ({ children, ...props }) => {
  const theme = useContext(ThemeContext)
  return (
    <ButtonWrapper theme={theme.state} {...props}>
      {children}
    </ButtonWrapper>
  )
}

export default Button
