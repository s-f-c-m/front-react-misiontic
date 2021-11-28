export default function TableWrapper (props) {
  const style = {
    backgroundColor: 'white',
    margin: '10px'
  }
  return (
    <div style={style} className="table-responsive container-fluid" id="tablaInformacion">
      <table className="table table-hover table-striped">
        <thead>
          <tr>{props.head}</tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  )
}
