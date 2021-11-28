import axios from 'axios'

const baseUrl = 'http://localhost:8082/user'

const getAll = async () => {
  const headers = {
    'Content-Type': 'application/json'
  }

  const { data } = await axios.get(
    baseUrl,
    { headers }
  )

  const ans = []
  data.usuarios.map(x => {
    const { id, password, ...temp } = x
    return ans.push(temp)
  })

  return ans
}

const postUsuario = async (values) => {
  const { passwordconfirm, ...newvalues } = values
  const headers = {
    'Content-Type': 'application/json'
  }
  const { data } = await axios.post(
    baseUrl,
    newvalues,
    { headers }
  )

  return data
}

export default { getAll, postUsuario }
