import { useEffect } from "react";

import useProcesos from "../hooks/useProcesos";

const Visados = ({ etapa }) => {
  const { obtenerVisados, visados, eliminarColaborador } = useProcesos();

  useEffect(() => {
    obtenerVisados(etapa);
  }, []);

  const handleClick = async (idus) => {
    await eliminarColaborador({ userId: idus, rol: "visado" });
  };

  return (
    <>
      <p className="font-bold text-sky-900">Visados</p>

      <div>
        {visados.length ? (
          visados.map((visado) => (
            <div className="grid grid-cols-3 gap-4 m-2" key={visado.id}>
              <div>{visado.nombre}</div>
              <div>{visado.mail}</div>
              <div>
                <input
                  type="button"
                  onClick={() => handleClick(visado.id)}
                  className="hidden"
                  id={`visado-${visado.id}`}
                />
                <label htmlFor={`visado-${visado.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </label>
              </div>
            </div>
          ))
        ) : (
          <p
            className="text-center
        text-sky-900 uppercase"
          >
            {visados.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Visados;
