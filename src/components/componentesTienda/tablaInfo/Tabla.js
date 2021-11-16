import Fila from "./Fila";
import TableWrapper from "./TableWrapper";
import TablaPaginacion from "./TablaPaginacion";
import { useState } from "react";
import ModelLarge from "../ModelLarge";

export default function Tabla({ documentos, ...props }) {
  const dictEncabezados = {
    'codigoProducto': 'Código Producto',
    'ivaCompra': 'Iva Compra',
    'nitProveedor': 'NIT Proveedor',
    'nombreProducto': 'Nombre Producto',
    'precioCompra': 'Precio Compra',
    'precioVenta\r': 'Precio Venta',
  }
  console.log(documentos)
  let encabezado = [];

  for (let i = 0; i < Object.keys(documentos[0]).length; i++) {
    encabezado.push(dictEncabezados[Object.keys(documentos[0])[i]]);
    // encabezado.push(Object.keys(documentos[0])[i]);
    console.log(encabezado)
  }

  const [paginaActual, setPaginaActual] = useState("1");

  const [filasPorPagina, setFilasPorPagina] = useState("10");

  const totalPaginas = Math.ceil(documentos.length / filasPorPagina);

  let listaInicial = documentos.slice(0, filasPorPagina);
  const [documentosPorPagina, setDocumentosPorPagina] = useState(listaInicial);

  // console.log('table', { encabezado})

  return (
    // <ModelLarge>
    <>
      <TableWrapper
        head={encabezado.map((columna) => (
          <th scope="col" key={columna}>{columna}</th>
        ))}
        tituloTabla={props.tituloTabla}
      >
        {documentosPorPagina.map((documento, index) => {
          let fila = [];

          for (let i = 0; i < Object.values(documento).length; i++) {
            fila.push(Object.values(documento)[i]);
          }
          return <Fila key={index} registro={fila} />;
        })}
      </TableWrapper>
      <TablaPaginacion
        pagina={paginaActual}
        setPaginaActual={setPaginaActual}
        totalPaginas={totalPaginas}
        onChange={(pagina) => {
          setPaginaActual(pagina);
          setDocumentosPorPagina(
            documentos.slice(
              (pagina - 1) * filasPorPagina,
              pagina * filasPorPagina
            )
          );
        }}
      />
    </>
    // </ModelLarge>
  );
}
