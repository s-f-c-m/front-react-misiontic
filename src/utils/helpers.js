
const csvToArray = (text = '', delim = ',') => {
  const headers = text.slice(0, text.indexOf('\n')).split(delim)
  const rows = text.slice(text.indexOf('\n') + 1).split('\n')

  const newArray = rows.map((row) => {
    const values = row.split(delim)
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i]
      return obj
    }, {})
    return eachObject
  })

  return newArray
}

export { csvToArray }
