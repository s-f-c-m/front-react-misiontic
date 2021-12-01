import { useState, useEffect } from 'react'
import InputForm from './InputForm'
import FormContainer from './FormsContainer'
import Button from './Button'
import { Formik, Form } from 'formik'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import serviceClientes from '../services/clientes'

export default function FormClientes (props) {
  const [isCliente, setIsCliente] = useState(false)
  const { selected, flagToUpdate, setFlagToUpdate } = props
  const [message, setMessage] = useState({ severity: '', title: '', message: '' })

  const formularioInicial = {
    cedulaCliente: '',
    nombreCliente: '',
    emailCliente: '',
    direccionCliente: '',
    telefonoCliente: ''
  }

  const [formulario, setFormulario] = useState(formularioInicial)
  const [httpAction, setHttpAction] = useState('')

  const handleSubmitsForm = async (values) => {
    const op = httpAction
    switch (op) {
      case 'register':
        serviceClientes.postCliente(values).then(() => {
          setMessage({ severity: 'success', title: 'Cliente Agregado', message: 'Se agregó el cliente satisfactoriamente' })
        }).catch(() => {
          setMessage({ severity: 'error', title: 'Error Agregar', message: 'Ocurrió un error al agregar el cliente. Intente de nuevo o comuníquese con el administrador' })
          alert('Error al agregar cliente')
        }).finally(() => {
          setFlagToUpdate(!flagToUpdate)
        })
        break
      case 'update':
        serviceClientes.putCliente(values).then(() => {
          setMessage({ severity: 'success', title: 'Cliente Modificado', message: 'Se modificó el cliente satisfactoriamente' })
        }).catch(() => {
          setMessage({ severity: 'error', title: 'Error Modificar', message: 'Ocurrió un error al modificar el cliente. Intente de nuevo o comuníquese con el administrador' })
        }).finally(() => {
          setFlagToUpdate(!flagToUpdate)
        })
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (selected.length === 1) {
      serviceClientes.getCliente(selected[0]).then((data) => {
        setFormulario(data)
      }).catch(() => {
        alert('Error al consultar cliente')
      }).finally(() => {
        setIsCliente(true)
      })
    }
  }, [])

  if (message.message !== '') {
    return (
     <Alert severity={message.severity}>
        <AlertTitle>{message.title}</AlertTitle>
      {message.message}
      </Alert>
    )
  }

  return <>
    <div style={{ display: 'flex', 'flex-direction': 'column' }}>
      <FormContainer >
        <Formik
          enableReinitialize={true}
          initialValues={formulario}
          onSubmit={(values, { resetForm }) => {
            handleSubmitsForm(values)
            resetForm()
          }}
        >{props => (
          <Form style={{ display: 'grid', gap: '5px' }}>
            <InputForm
              label='Cédula'
              name='cedulaCliente'
              placeholder='Cédula del cliente'
              disabled={isCliente}
              required='required'
            />
            <InputForm
              label='Nombre'
              name='nombreCliente'
              placeholder='Nombre del Cliente'
              required='required'
            />
            <InputForm
              label='Email'
              name='emailCliente'
              type='email'
              placeholder='Email del cliente'
              required='required'
            />
            <InputForm
              label='Dirección'
              name='direccionCliente'
              placeholder='Dirección del cliente'
              required='required'
            />
            <InputForm
              label='Teléfono'
              name='telefonoCliente'
              placeholder='Teléfono del cliente'
              required='required'
            />
            <div style={{ display: 'flex', gap: '5px', 'justify-content': 'space-between' }} >
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
