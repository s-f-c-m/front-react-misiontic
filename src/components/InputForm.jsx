import { useField } from 'formik'
import Input from './Input.jsx'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: .5fr 1fr;
  gap: 5px;
  width:100%;
  justify-content: space-between;
  color: white;
  @media (max-width: 600px){
    grid-template-columns: 1fr;
  }
`

const InputForm = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <Wrapper>
        <label htmlFor={props.name}>{label}</label>
        <Input id={props.name} {...field} {...props} />
      </Wrapper>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  )
}
export default InputForm
