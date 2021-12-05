import Snackbar from '@mui/material/Snackbar'
import { forwardRef } from 'react'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AlertPopup = ({ message, setMessage }) => {
  const vertical = 'top'
  const horizontal = 'center'
  return (
    <div>
      <Snackbar
           anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        open={message.open}
        onClose={() => setMessage({ open: false, message: '' })}
          >
          <Alert severity={message.severity} sx={{ width: '100%' }}>
            {message.message}
          </Alert>

      </Snackbar>
    </div>
  )
}

export default AlertPopup
