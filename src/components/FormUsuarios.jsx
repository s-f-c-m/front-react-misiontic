import { useState, useEffect } from 'react'
import InputForm from './InputForm'
import FormContainer from './FormsContainer'
import Button from './Button'
import { Formik, Form } from 'formik'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
// import Stack from '@mui/material/Stack'
import serviceUsuarios from '../services/usuarios'

export default function FormUsuarios (props) {
  const [isCliente, setIsCliente] = useState(false)
  const { selected, flagToUpdate, setFlagToUpdate } = props
  const [message, setMessage] = useState({ severity: '', title: '', message: '' })

  const formularioInicial = {
    user: '',
    password: '',
    passwordconfirm: '',
    name: '',
    email: '',
    roles: ['user']
  }

  const [formulario, setFormulario] = useState(formularioInicial)
  const [httpAction, setHttpAction] = useState('')
  const [passerror, setPasserror] = useState(false)

  const handleSubmitsForm = async (values) => {
    const op = httpAction
    switch (op) {
      case 'register':
        if (values.password !== values.passwordconfirm) {
          setPasserror(true)
          setTimeout(() => {
            setPasserror(false)
          }, 2500)
          break
        }
        serviceUsuarios.postUsuario(values).then(() => {
          setMessage({ severity: 'success', title: 'Usuario Agregado', message: 'Se agregó el usuario satisfactoriamente' })
        }).catch(() => {
          setMessage({ severity: 'error', title: 'Error Agregar', message: 'Ocurrió un error al agregar el usuario. Intente de nuevo o comuníquese con el administrador' })
        }).finally(() => {
          setFlagToUpdate(!flagToUpdate)
        })
        break
      case 'update':
        serviceUsuarios.putUsuario(values).then(() => {
          setMessage({ severity: 'success', title: 'Usuario Modificado', message: 'Se modificó el usuario satisfactoriamente' })
        }).catch(() => {
          setMessage({ severity: 'error', title: 'Error Modificar', message: 'Ocurrió un error al modificar el usuario. Intente de nuevo o comuníquese con el administrador' })
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
      serviceUsuarios.getUsuario(selected[0]).then((data) => {
        setFormulario(data)
      }).catch(() => {
        alert('Error al consultar usuario')
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
    {passerror &&
    <Alert severity='error'>
    <AlertTitle>Error</AlertTitle>
    Contraseñas no coinciden
    </Alert>
    }

      <FormContainer >
        <Formik
          enableReinitialize={true}
          initialValues={formulario}
          onSubmit={(values, { resetForm }) => {
            handleSubmitsForm(values)
            // resetForm()
          }}
        >{props => (
          <Form style={{ display: 'grid', gap: '5px' }}>
            <InputForm
              label='usuario'
              name='user'
              placeholder='Usuario'
              disabled={isCliente}
            />
            <InputForm
              label='Nombre'
              name='name'
              placeholder='Nombre del usuario'
            />
            <InputForm
              label='Email'
              name='email'
              type='email'
              placeholder='Email del usuario'
            />
            <InputForm
              label='Contraseña'
              name='password'
              type='password'
              placeholder='Contraseña'
            />
            <InputForm
              label='Confirmar Contraseña'
              name='passwordconfirm'
              type='password'
              placeholder='Confirmar'
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
