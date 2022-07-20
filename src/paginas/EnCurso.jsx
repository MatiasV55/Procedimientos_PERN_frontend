import { useEffect } from "react";

import useProcesos from "../hooks/useProcesos";
import PreviewEnCurso from "../components/PreviewEnCurso";

const EnCurso = () => {
  const { obtenerEnCurso, procesosCorriendo, cargando } = useProcesos();

  useEffect(() => {
    obtenerEnCurso();
  }, []);

  if (cargando) return "Cargando...";

  return (
    <>
      <h2 className="text-1xl font-bold text-sky-900">
        Procedimientos en curso
      </h2>

      <div>
        {procesosCorriendo.length ? (
          procesosCorriendo.map((proceso) => (
            <PreviewEnCurso key={proceso.ejecutadoid} proceso={proceso} />
          ))
        ) : (
          <p
            className="text-center
        text-sky-900 uppercase bg-white shadow mt-10 rounded-lg border-2 border-sky-900"
          >
            No tiene procedimientos en curso
          </p>
        )}
      </div>
    </>
  );
};

export default EnCurso;
