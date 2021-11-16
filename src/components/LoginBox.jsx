import { useState, useContext } from 'react';
import styled from "styled-components";
import { ThemeContext } from '../theme/ThemeContext';
import FormLogin from './FormLogin'

const Box = styled.div`
  position: relative;
  width: 480px;
  aspect-ratio: 3/1;
  display: flex;
  justify-content: flex-end;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10%;
`;
const Cards = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Left = styled(Cards)`
  background-color: ${(props) => props.theme.mainColor2};
  color: ${(props) => !props.errorMsg ? 'white' : 'red'};
  /* font-size: 25px; */
  font-size: ${(props) => !props.errorMsg ? '25px' : '15px'};
  font-weight: 700;
  position: absolute;
  text-align: center;
  transform: translateX(-240px);
  /* transition: all ease 0.7s; */

  ${Box}:hover & {
  transform: translateX(-240px);
  box-shadow: 1px 0 5px rgb(0, 0, 0, 0.3);
  }
`;
const Right = styled(Cards)`
  background-color: white;
`;



const LoginBox = ({ children, slideCard }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const theme = useContext(ThemeContext)
  return (
    <Box>
      <Left className='slidingCard' theme={theme.state} ref={slideCard} errorMsg={errorMsg}>{errorMsg ? errorMsg : children}</Left>
      <Right theme={theme.state} >
        <FormLogin setErrorMsg={setErrorMsg} />
      </Right>
    </Box>
  );
};

export default LoginBox;
