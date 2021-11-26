
const FormContainer = ({ titulo, children }) => {
  return (
    <div className="card text-white bg-info mb-3" style={{ width: '100%', 'max-width': '500px' }}>
      <div className="card-header">{titulo}</div>
      <div className="card-body">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  )
}

export default FormContainer
