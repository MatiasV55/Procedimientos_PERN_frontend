import { useState } from "react";
import { Link } from "react-router-dom";

import useProcesos from "../hooks/useProcesos";
import Alerta from "./Alerta";

const PRIORIDAD = [
  { id: 1, pr: "Baja" },
  { id: 2, pr: "Media" },
  { id: 3, pr: "Alta" },
];

const PreviewEtapa = ({ etapa }) => {
  const { nombre, id, descripcion, prioridad, siguiente_id } = etapa;

  const [name, setName] = useState(nombre);
  const [description, setDescription] = useState(descripcion);
  const [priority, setPriority] = useState(prioridad);

  const { mostrarAlerta, alerta, submitEtapa } = useProcesos();

  const handleEtapaSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, priority].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    //Pasar los datos hacia el provider
    await submitEtapa({ id, name, description, priority });
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="p-5 border-2 border-sky-900 flex justify-between bg-white shadow mt-5 rounded-lg"
        onSubmit={handleEtapaSubmit}
      >
        <div className="flex gap-4">
          <div>
            <label
              className="text-sky-900 uppercase font-bold text-sm"
              htmlFor="nombre"
            >
              Etapa id{id}
            </label>

            <input
              id="nombre"
              type="text"
              className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
              placeholder="Nombre la etapa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              className="text-sky-900 uppercase font-bold text-sm"
              htmlFor="descripcion"
            >
              Descripción
            </label>

            <textarea
              id="descripcion"
              className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
              placeholder="Descripción etapa"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label
              className="text-sky-900 uppercase font-bold text-sm"
              htmlFor="prioridad"
            >
              Prioridad
            </label>
            <select
              id="prioridad"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">--- Seleccionar ---</option>

              {PRIORIDAD.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>
                  {opcion.pr}
                </option>
              ))}
            </select>
          </div>

          <input
            type="submit"
            value="Actualizar Etapa"
            className="bg-sky-900 text-white hover:text-sky-900 hover:bg-white p-2 
            uppercase font-bold rounded cursor-pointer transition-colors border-2 border-sky-900"
          />
        </div>
        {siguiente_id ? (
          <Link
            to={`/procesos/etapa/${id}`}
            className="text-emerald-600 hover:text-emerald-400 uppercase text-sm font-bold flex items-center ml-5 text-center"
          >
            Sig Etapa ID{siguiente_id}
          </Link>
        ) : (
          <Link
            to={`/procesos/etapa/${id}`}
            className="text-rose-700 hover:text-rose-500 uppercase text-sm font-bold flex items-center ml-5 text-center"
          >
            Fin del ciclo
          </Link>
        )}
      </form>
    </>
  );
};

export default PreviewEtapa;
