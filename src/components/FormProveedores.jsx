import { useState, useEffect, useContext } from 'react'
import InputForm from './InputForm'
import FormContainer from './FormsContainer'
import Button from './Button'
import { Formik, Form } from 'formik'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import serviceProveedores from '../services/proveedores'
import { CityContext } from '../CiudadContext/CiudadContext'

export default function FormProveedores (props) {
  const [isCliente, setIsCliente] = useState(false)
  const { selected, flagToUpdate, setFlagToUpdate } = props
  const [message, setMessage] = useState({ severity: '', title: '', message: '' })
  const city = useContext(CityContext)

  const formularioInicial = {
    nitProveedor: '',
    nombreProveedor: '',
    direccionProveedor: '',
    ciudadProveedor: '',
    telefonoProveedor: ''
  }

  const [formulario, setFormulario] = useState(formularioInicial)
  const [httpAction, setHttpAction] = useState('')

  const handleSubmitsForm = async (values) => {
    const op = httpAction
    switch (op) {
      case 'register':
        serviceProveedores.postProveedor(city.state.portProveedores, values).then(() => {
          setMessage({ severity: 'success', title: 'Proveedor Agregado', message: 'Se agregó el proveedor satisfactoriamente' })
        }).catch(() => {
          setMessage({ severity: 'error', title: 'Error Agregar', message: 'Ocurrió un error al agregar el preveedor. Intente de nuevo o comuníquese con el administrador' })
        }).finally(() => {
          setFlagToUpdate(!flagToUpdate)
        })
        break
      case 'update':
        serviceProveedores.putProveedor(city.state.portProveedores, values).then(() => {
          setMessage({ severity: 'success', title: 'Proveedor Modificado', message: 'Se modificó el proveedor satisfactoriamente' })
        }).catch(() => {
          setMessage({ severity: 'error', title: 'Error Modificar', message: 'Ocurrió un error al modificar el proveedor. Intente de nuevo o comuníquese con el administrador' })
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
      serviceProveedores.getProveedor(city.state.portProveedores, selected[0]).then((data) => {
        setFormulario(data)
      }).catch(() => {
        alert('Error al consultar proveedor')
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              label='NIT'
              name='nitProveedor'
              placeholder='Nit del Proveedor'
              disabled={isCliente}
              required='required'
            />
            <InputForm
              label='Nombre'
              name='nombreProveedor'
              placeholder='Nombre del Proveedor'
              required='required'
            />
            <InputForm
              label='Dirección'
              name='direccionProveedor'
              placeholder='Dirección del Proveedor'
              required='required'
            />
            <InputForm
              label='Ciudad'
              name='ciudadProveedor'
              placeholder='Ciudad del Proveedor'
              required='required'
            />
            <InputForm
              label='Teléfono'
              name='telefonoProveedor'
              placeholder='Teléfono del Proveedor'
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
