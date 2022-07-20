import { useState } from "react";

import useProcesos from "../hooks/useProcesos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");

  const { mostrarAlerta, alerta, submitColaborador } = useProcesos();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email == "") {
      mostrarAlerta({
        msg: "El Email es obligatorio",
        error: true,
      });
      return;
    }

    submitColaborador(email)
  };

  const { msg } = alerta;
  return (
    <>
      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label
            className="text-sky-900 uppercase font-bold text-sm"
            htmlFor="email"
          >
            Email colaborador
          </label>

          <input
            id="email"
            type="email"
            className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
            placeholder="Email de usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Buscar"
          className="bg-sky-900 text-white hover:text-sky-900 hover:bg-white w-full p-3 uppercase font-bold rounded cursor-pointer transition-colors border-2 border-sky-900"
        />
      </form>
    </>
  );
};

export default FormularioColaborador;
