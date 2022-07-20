import { Link, useLocation } from "react-router-dom";

import useProcesos from "../hooks/useProcesos";

const PreviewProceso = ({ proceso }) => {
  const sampleLocation = useLocation();
  const urlActual = sampleLocation.pathname;

  const { titulo, id, descripcion } = proceso;

  const { eliminarProceso, handleModalIniciarProceso } = useProcesos();

  const handleClick = () => {
    if (confirm("¿Está seguro que desea eliminar el procedimiento?")) {
      eliminarProceso(proceso.id);
    }
  };

  //Si estamos en edición de procesos
  if (urlActual === "/procesos/listar-procesos") {
    return (
      <div className="border-2 border-sky-900 py-5 px-10 flex flex-col md:flex-row justify-between bg-white shadow mt-5 rounded-lg">
        <div className="flex items-center gap-5 w-full">
          <p className="text-sky-900 font-bold w-full">{titulo}</p>
          <p className="text-sm text-sky-500 uppercase font-light w-full">
            {descripcion}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={`/procesos/${id}`}
            className="text-sky-900 hover:text-sky-500 uppercase text-sm font-bold flex items-center"
          >
            Editar
          </Link>

          <button
            className="text-red-900 hover:text-red-500 uppercase text-sm font-bold flex items-center"
            onClick={handleClick}
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-sky-900 py-5 px-10 flex flex-col md:flex-row justify-between bg-white shadow mt-5 rounded-lg">
      <div className="flex items-center gap-5 w-full">
        <p className="text-sky-900 font-bold w-full">{titulo}</p>
        <p className="text-sm text-sky-500 uppercase font-light w-full">
          {descripcion}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="text-emerald-600 hover:text-emerald-400 uppercase text-sm font-bold flex items-center"
          onClick={() => handleModalIniciarProceso(proceso)}
        >
          Iniciar
        </button>

        <Link
          to={`/procesos/ver-proceso/${id}`}
          className="text-indigo-900 hover:text-indigo-500 uppercase text-sm font-bold flex items-center"
        >
          Ver
        </Link>
      </div>
    </div>
  );
};

export default PreviewProceso;
