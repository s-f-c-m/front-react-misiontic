// import "./Content.css";
import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext'

const ContentWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainColor1};
`

const Content = ({ children }) => {
  const theme = useContext(ThemeContext)
  return (
    <ContentWrapper theme={theme.state} >
      {children}
    </ContentWrapper>
  )
}

export default Content
