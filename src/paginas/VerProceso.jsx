import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useProcesos from "../hooks/useProcesos";

import Etapa from "../components/Etapa";

const VerProceso = () => {
  const params = useParams();

  const { obtenerProceso, proceso, cargando, obtenerEtapas, etapas } =
    useProcesos();

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
      </div>

      <div className="grid grid-flow-row gap-4">
        {etapas.length ? (
          etapas.map((etapa) => 
          <Etapa key={etapa.id} etapa={etapa} />
          )
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

export default VerProceso;
