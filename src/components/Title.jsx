import styled from "styled-components";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const TitleBox = styled.div`
  font-size: 40px;
  color: white;
  margin: 25px;
  text-align: center;
  display: block;
`;

const Title = ({ children }) => {
  return (
    <TitleBox>
      <i className="fa fa-leaf" aria-hidden="true"></i>
      <div>{children}</div>
    </TitleBox>
  );
};

export default Title;
