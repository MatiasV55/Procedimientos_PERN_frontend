import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useProcesos from "../hooks/useProcesos";

import PreviewEtapa from "../components/PreviewEtapa";
import ModalEditarProceso from "../components/ModalEditarProceso";

const Proceso = () => {
  const params = useParams();

  const [modal, setModal] = useState(false);

  const {
    obtenerProceso,
    proceso,
    cargando,
    obtenerEtapas,
    etapas,
    handleModalProceso,
  } = useProcesos();

  useEffect(() => {
    obtenerProceso(params.id);
    obtenerEtapas(params.id);
  }, []);

  const { titulo, cantidad_etapas } = proceso;

  if (cargando) return "Cargando...";

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-1xl font-bold text-sky-900">
          {titulo} - Etapas: {cantidad_etapas}
        </h2>

        <div className="flex items-center gap-2 text-sky-900 hover:text-sky-400">
          <button onClick={handleModalProceso} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                    2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <ModalEditarProceso modal={modal} setModal={setModal} />
        </div>
      </div>

      <div>
        {etapas.length ? (
          etapas.map((etapa) => <PreviewEtapa key={etapa.id} etapa={etapa} />)
        ) : (
          <p
            className="text-center
        text-sky-900 uppercase"
          >
            No hay etapas
          </p>
        )}
      </div>
    </>
  );
};

export default Proceso;
