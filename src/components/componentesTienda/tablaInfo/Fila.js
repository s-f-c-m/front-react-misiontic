export default function Fila(props) {
  let registro = props.registro;

  return (
    <tr>
      {registro.map((campo) => (
        <td key={campo}>{campo}</td>
      ))}
    </tr>
  );
}
