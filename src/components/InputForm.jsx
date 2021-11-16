import { useField } from 'formik';
import Input from './Input.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: .5fr 1fr;
  gap: 5px;
  width:100%;
  justify-content: space-between;
  @media (max-width: 600px){
    grid-template-columns: 1fr;
  }
`

const InputForm = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <Wrapper>
        <label for={props.name}>{label}</label>
        <Input id={props.name} {...field} {...props} />
      </Wrapper>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  )
}

//   return (
//     <div className="form-group row">
//       <label className="control-label col-sm-4" for={props.id}>{label}</label>
//       <div className="col-sm-8">
//         <Input  {...props}
//           required />
//       </div>
//     </div>
//   )
// }

export default InputForm
