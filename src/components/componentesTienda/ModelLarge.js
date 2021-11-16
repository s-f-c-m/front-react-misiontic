export default function ModelLarge(props) {
    return <div className="modal fade" id="myModal">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
   
        <div className="modal-header">
          <h4 className="modal-title">{props.tituloTabla}</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div className="modal-body">
            {props.children}
        </div>       
        <div className="modal-footer">
              <button type="button" className="btn btn-primary">Enviar</button>         
        </div>  

      </div>
    </div>
  </div>
}