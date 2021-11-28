import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../theme/ThemeContext'

const MainBoxWrapper = styled.div`
  width: 765px;
  height: 490px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: box-shadow ease 1s;
  box-shadow: 20px 20px 60px ${(props) => props.theme.mainColor1Shadow1}, 
  -20px -20px 60px ${(props) => props.theme.mainColor1Shadow2};
`

const MainBox = ({ children }) => {
  const theme = useContext(ThemeContext)
  return (
    <MainBoxWrapper theme={theme.state}>
      {children}
    </MainBoxWrapper>
  )
}

export default MainBox
