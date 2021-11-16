import { useState } from 'react'
import { csvToArray } from '../utils/helpers'

const useLoadCsv = () => {
  const [csvArray, setCsvArray] = useState([])

  const loadCsv = (e) => {

    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e) {
      const text = e.target.result;
      setCsvArray(csvToArray(text));
    };
  }

  const clearCsvArray = () => {
    setCsvArray([])
  }

  return [csvArray, loadCsv, clearCsvArray]
}

export default useLoadCsv

