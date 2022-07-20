import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import useAuth from "../hooks/useAuth";

import useProcesos from "../hooks/useProcesos";
import PreviewProceso from "../components/PreviewProceso";
import ModalInitProceso from "../components/ModalInitProceso";

import io from "socket.io-client";

let socket;

const Procesos = () => {
  const { auth } = useAuth();

  const { procesos, obtenerProcesos } = useProcesos();

  useEffect(() => {
    obtenerProcesos();
  }, []);

  const sampleLocation = useLocation();

  const urlActual = sampleLocation.pathname;

  //Debo mostrar solo los procedimientos creados por el usuario
  if (urlActual === "/procesos/listar-procesos") {
    return (
      <>
        <h2 className="text-1xl font-bold text-sky-900">Mis procedimientos</h2>

        <div>
          {procesos.length ? (
            procesos.map((proceso) =>
              proceso.creador_id === auth.id ? (
                <PreviewProceso key={proceso.id} proceso={proceso} />
              ) : (
                <input type="hidden" key={proceso.titulo}></input>
              )
            )
          ) : (
            <p
              className="text-center
        text-sky-900 uppercase bg-white shadow mt-10 rounded-lg"
            >
              No hay procedimientos
            </p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-1xl font-bold text-sky-900">Iniciar proceso</h2>

      <div>
        {procesos.length ? (
          procesos.map((proceso) => (
            <PreviewProceso key={proceso.id} proceso={proceso} />
          ))
        ) : (
          <p
            className="text-center
        text-sky-900 uppercase bg-white shadow mt-10 rounded-lg border-2 border-sky-900"
          >
            No hay procedimientos para iniciar
          </p>
        )}
      </div>

      <ModalInitProceso />
    </>
  );
};

export default Procesos;
