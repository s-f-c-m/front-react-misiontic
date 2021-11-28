import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext'

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainColor1};
  padding: 25px 15px;
  border-radius: 5px;
`

const FormContainer = ({ children }) => {
  const theme = useContext(ThemeContext)
  return (
    <ContentWrapper theme={theme.state} >
      {children}
    </ContentWrapper>
  )
}
export default FormContainer
