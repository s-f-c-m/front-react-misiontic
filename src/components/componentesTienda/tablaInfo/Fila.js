export default function Fila (props) {
  const registro = props.registro
  return (
    <tr>
      {registro.map((campo) => (
        <td key={campo}>{campo}</td>
      ))}
    </tr>
  )
}
