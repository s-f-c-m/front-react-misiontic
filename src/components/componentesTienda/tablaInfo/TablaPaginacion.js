export default function TablaPaginacion({ setPaginaActual, ...props }) {
  const anterior = () => {
    if (props.pagina > 1) {
      setPaginaActual(parseInt(props.pagina) - 1 + "");
      props.onChange(parseInt(props.pagina) - 1 + "");
    }
  };

  const siguiente = () => {
    if (props.pagina < parseInt(props.totalPaginas)) {
      setPaginaActual(parseInt(props.pagina) + 1 + "");
      props.onChange(parseInt(props.pagina) + 1 + "");
    }
  };

  return (
    <div>
      <div className="col">
        <ul className="pagination pagination-sm">
          <li className="page-item">
            <a className="page-link" href="#" onClick={anterior}>
              Anterior
            </a>
          </li>
          {[...new Array(props.totalPaginas)].map((n, index) => (
            <li
              key={index}
              className={`page-item ${
                parseInt(props.pagina, 10) === index + 1 ? "active" : ""
              }`}
            >
              <a
                className="page-link"
                onClick={() => props.onChange(index + 1 + "")}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={siguiente}>
              Siguiente
            </a>
          </li>
        </ul>
      </div>
      {/* <span className="col">
        Página {props.pagina} de {props.totalPaginas}
      </span> */}
    </div>
  );
}
