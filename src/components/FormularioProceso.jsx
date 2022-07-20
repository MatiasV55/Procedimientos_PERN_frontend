import { useState } from "react";

import useProcesos from "../hooks/useProcesos";
import Alerta from "./Alerta";

const FormularioProceso = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [etapas, setEtapas] = useState("");

  const { mostrarAlerta, alerta, submitProceso } = useProcesos();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([titulo, descripcion, etapas].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    //Pasar los datos hacia el provider
    await submitProceso({ titulo, descripcion, etapas });

    setTitulo("");
    setDescripcion("");
    setEtapas("");
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow border-2 border-sky-900"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-sky-900 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre proceso
        </label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
          placeholder="Nombre del proceso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-sky-900 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>

        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
          placeholder="Descripción procedimiento"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-sky-900 uppercase font-bold text-sm"
          htmlFor="etapas"
        >
          Cantidad Etapas
        </label>

        <input
          type="number"
          id="etapas"
          className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
          placeholder="Número de etapas del procedimiento"
          value={etapas}
          onChange={(e) => setEtapas(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Crear proceso"
        className="bg-sky-900 text-white hover:text-sky-900 hover:bg-white w-full p-3 uppercase 
            font-bold rounded cursor-pointer transition-colors border-2 border-sky-900"
      />
    </form>
  );
};

export default FormularioProceso;
