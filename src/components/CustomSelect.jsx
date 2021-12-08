import Select from 'react-select'

const customStyles = {
  menu: (provided) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: 'black',
    padding: 10
  })
}

export const CustomSelect = ({
  placeholder,
  field,
  form,
  options,
  isMulti = false
}) => {
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option).map((item) => item.value)
        : (option).value
    )
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value)
    } else {
      return isMulti ? [] : ('')
    }
  }

  return (
    <Select
      styles={customStyles}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  )
}

export default CustomSelect
