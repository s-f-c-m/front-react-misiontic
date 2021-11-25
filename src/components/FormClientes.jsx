import { useState, useRef } from 'react'
import InputForm from './InputForm'
import FormContainer from './FormsContainer'
import Button from './Button'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik"
export default function FormClientes() {

  const [isCliente, setIsCliente] = useState(false)

  const formularioInicial = {
    cedulaCliente: '',
    nombreCliente: '',
    emailCliente: '',
    direccionCliente: '',
    telefonoCliente: ''
  }

  const formularioAux = {
    cedulaCliente: 'aaaa',
    nombreCliente: '',
    emailCliente: '',
    direccionCliente: '',
    telefonoCliente: ''
  }
  const [formulario, setFormulario] = useState(formularioInicial)
  const [httpAction, setHttpAction] = useState('')

  const postClientes = async (formulario) => {
    const headers = {
      "Content-Type": "application/json"
    };
    const resp = await axios.post(
      "http://localhost:8083/api/v1/clientes",
      formulario,
      { headers }
    )
    return resp;
  }

  const handleRegistro = async (values) => {
    const ans = await postClientes(values);
    console.log(ans);
    setFormulario(formularioInicial);
    if (ans) {
      alert('Cliente registrado')
    }
    return ans;
  }

  const getClientes = async (cedula) => {
    const headers = {
      "Content-Type": "application/json"
    };
    const { data } = await axios.get(
      "http://localhost:8083/api/v1/clientes/" + cedula,
      { headers }
    )
    return data
  }

  const handleConsulta = async (cedulaConsulta) => {
    console.log(formulario)
    //   e.preventDefault();
    const cons = await getClientes(cedulaConsulta);
    if (cons != null) {
      setIsCliente(true)
      setFormulario(cons)
    } else {
      setFormulario(formularioInicial)
      setIsCliente(false)
      alert("Cédula no registrada")
    }
  }

  const handlePut = async (datos) => {
    console.log(datos)
    const headers = {
      "Content-Type": "application/json"
    };
    const { data } = await axios.put(
      'http://localhost:8083/api/v1/clientes/' + datos.cedulaCliente,
      datos,
      { headers }
    )
    return data
  }

  const handleUpdate = async (datos) => {
    const updated = await handlePut(datos);
    console.log(updated)
    setFormulario(formularioInicial);
    setIsCliente(false)
    if (updated) {
      alert('Cliente modificado')
    }
    return updated;
  }

  const handleDelete = async (datos) => {
    const headers = {
      "Content-Type": "application/json"
    };
    const { data } = await axios.delete(
      'http://localhost:8083/api/v1/clientes/' + datos.cedulaCliente,
      { headers }
    )
    return data;
  }

  const handleDel = async (values) => {
    const deleted = await handleDelete(values)
    setFormulario(formularioInicial);
    setIsCliente(false)
    if (deleted) {
      alert('Cliente elimnado')
    }
    return deleted;
  }

  const resetForm = () => {
    setFormulario(formularioInicial)
    setIsCliente(false)
  }

  const handleSubmitsForm = async (values) => {
    const op = httpAction;
    var ans;
    switch (op) {
      case 'register':
        ans = await handleRegistro(values)
        break;
      case 'update':
        ans = await handleUpdate(values);
        break;
      case 'delete':
        ans = await handleDel(values);
      default:
        break;
    }
    console.log(ans)
  }


  return <>
    <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
      <FormContainer titulo='Consultar Cliente'>
        <Formik
          initialValues={{ cedula: '' }}
          onSubmit={values => handleConsulta(values.cedula)}
        >
          <Form>
            <InputForm
              label='Cédula'
              name='cedula'
              type='number'
              placeholder='Cédula del cliente'
            />
            <Button type='submit' >Consultar</Button>
          </Form>
        </Formik>
      </FormContainer>
      <FormContainer titulo='Registar Cliente'>
        <Formik
          enableReinitialize={true}
          initialValues={formulario}
          onSubmit={(values, { resetForm }) => {
            handleSubmitsForm(values);
            resetForm();
          }}
        >{props => (

          <Form style={{ 'display': 'grid', 'gap': '5px' }}>
            <InputForm
              label='Cédula'
              name='cedulaCliente'
              placeholder='Cédula del cliente'
              disabled={isCliente}
            />
            <InputForm
              label='Nombre'
              name='nombreCliente'
              placeholder='Nombre del Cliente'
            />
            <InputForm
              label='Email'
              name='emailCliente'
              type='email'
              placeholder='Email del cliente'
            />
            <InputForm
              label='Dirección'
              name='direccionCliente'
              placeholder='Dirección del cliente'
            />
            <InputForm
              label='Teléfono'
              name='telefonoCliente'
              placeholder='Télofono del cliente'
            />
            <div style={{ 'display': 'flex', 'gap': '5px', 'justify-content': 'space-between' }} >
              {!isCliente &&
                <>
                  <Button name='register' type='submit' onClick={() => setHttpAction('register')}>Ingresar</Button>
                  <Button type='button' onClick={props.handleReset}>Reset</Button>
                </>
              }
              {
                isCliente &&
                <>
                  <Button name='update' type='submit' onClick={() => { setHttpAction('update') }}>Actualizar</Button>
                  <Button name='delete' type='submit' onClick={() => setHttpAction('delete')}>Eliminar</Button>
                  <Button
                    onClick={() => {
                      setFormulario(formularioInicial)
                      setIsCliente(false)
                      console.log('reset')
                    }}
                  >Reset
                  </Button>
                </>
              }

            </div>
          </Form>
        )}
        </Formik>
      </FormContainer>
    </div >
  </>
}
