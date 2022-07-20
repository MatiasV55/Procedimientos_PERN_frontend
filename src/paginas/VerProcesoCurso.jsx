import { useParams } from "react-router-dom";
import { useEffect } from "react";

import useProcesos from "../hooks/useProcesos";

const PRIORIDAD = ["Baja", "Media", "Alta"];

const VerProcesoCurso = () => {
  let visados = [];
  let aprobados = [];

  const params = useParams();

  const { obtenerEtapaByExecuted, etapa, cargando, obtenerUsers, users } =
    useProcesos();

  useEffect(() => {
    obtenerEtapaByExecuted(params.ejecutado);
    obtenerUsers(params.ejecutado);
  }, []);

  for (let usuario in users) {
    if (users[usuario].accion == 1) {
      visados.push(users[usuario]);
    } else if (users[usuario].accion == 2) {
      aprobados.push(users[usuario]);
    }
  }

  if (cargando) return "Cargando...";

  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold text-sky-900">{etapa.nombre}</p>
        <p className="font-bold text-slate-600">
          Prioridad: {PRIORIDAD[etapa.prioridad - 1]}
        </p>
      </div>

      <div className="flex justify-center mt-2">
        <p className="font-bold text-sky-400">{etapa.descripcion}</p>
      </div>

      <div className="flex justify-between mt-10">
        <div>
          <p className="text-xl text-cyan-800 font-medium flex justify-center underline underline-offset-4">
            VISADOS
          </p>
          {visados.length ? (
            visados.map((visado) => (
              <div className="flex justify-between m-2" key={visado.id}>
                {visado.chequeo ? (
                  <div className="grid grid-cols-2">
                    <p className="text-green-700 font-bold">{visado.nombre}</p>
                    <p className="text-green-700 font-bold">{visado.mail}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2">
                    <p className="text-red-700 font-bold">{visado.nombre}</p>
                    <p className="text-red-700 font-bold">{visado.mail}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p
              className="text-center
        text-sky-900 uppercase"
            >
              {users.message}
            </p>
          )}
        </div>
        <div>
          <p className="text-xl text-cyan-800 font-medium flex justify-center underline underline-offset-4">
            APROBADOS
          </p>
          {aprobados.length ? (
            aprobados.map((aprobado) => (
              <div className="flex justify-between m-2" key={aprobado.id}>
                {aprobado.chequeo ? (
                  <div className="grid grid-cols-2">
                    <p className="text-green-700 font-bold">
                      {aprobado.nombre}
                    </p>
                    <p className="text-green-700 font-bold">{aprobado.mail}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2">
                    <p className="text-red-700 font-bold">{aprobado.nombre}</p>
                    <p className="text-red-700 font-bold">{aprobado.mail}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p
              className="text-center
        text-red-700 uppercase"
            >
              {users.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default VerProcesoCurso;
