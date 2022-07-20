import { useEffect } from "react";

import useProcesos from "../hooks/useProcesos";

const Aprobados = ({ etapa }) => {
  const { obtenerAprobados, aprobados, eliminarColaborador } = useProcesos();

  useEffect(() => {
    obtenerAprobados(etapa);
  }, []);

  const handleClick = async (idus) => {
    await eliminarColaborador({ userId: idus, rol: "aprobado" });
  };

  return (
    <>
      <p className="font-bold text-sky-900">Aprobados</p>

      <div>
        {aprobados.length ? (
          aprobados.map((aprobado) => (
            <div className="grid grid-cols-3 gap-4 m-2" key={aprobado.id}>
              <span>{aprobado.nombre}</span>
              <span>{aprobado.mail}</span>
              <span>
                <input
                  type="button"
                  onClick={() => handleClick(aprobado.id)}
                  className="hidden"
                  id={aprobado.id}
                />
                <label htmlFor={aprobado.id}>
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
              </span>
            </div>
          ))
        ) : (
          <p
            className="text-center
        text-sky-900 uppercase"
          >
            {aprobados.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Aprobados;
