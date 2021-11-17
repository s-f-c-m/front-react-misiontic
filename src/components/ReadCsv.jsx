import { useState, useEffect, useRef, useContext } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import Tabla from "./componentesTienda/tablaInfo/Tabla";
import useLoadCsv from "../hooks/useLoadCsv"
import { SessionContext } from "../auth/session";

const ReadCsv = () => {

  const [csvArray, loadCsv, clearCsvArray] = useLoadCsv();
  const inputFile = useRef();
  const { userSession } = useContext(SessionContext)


  const clearTable = () => {
    clearCsvArray()
    inputFile.current.value = "";
  };

  const handlePostProductos = async () => {
    const body = JSON.stringify(csvArray);
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "http://localhost:8085/api/productos",
        body,
        { headers }
      );
    } catch {
      alert("Error al cargar");
      return;
    }
    alert("Carga exitosa");
    clearTable();
  };

  const styles = {
    form: {
      display: "flex",
      gap: "5px",
    },
  };


  return (
    <div>
      <form id="csv-form" style={styles.form}>
        <Input
          style={{ color: "white" }}
          ref={inputFile}
          type="file"
          accept=".csv"
          id="csvFile"
          onChange={loadCsv}
          onClick={clearTable}
        />
        <Button type='reset' onClick={clearTable} type="button">
          Limpiar
        </Button>
      </form>

      {csvArray.length > 0 && (
        <>
          <Tabla tituloTabla="Productos" documentos={csvArray} />
          <Button onClick={handlePostProductos}>
            Enviar
          </Button>
        </>
      )}
    </div>
  );
};

export default ReadCsv;
