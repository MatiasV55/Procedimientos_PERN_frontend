import { useParams } from "react-router-dom";
import { useEffect } from "react";

import FormularioColaborador from "../components/FormularioColaborador";
import useProcesos from "../hooks/useProcesos";
import Alerta from "../components/Alerta";
import Visados from "../components/Visados";
import Aprobados from "../components/Aprobados";

const ConfigurarEtapa = () => {
  const {
    participante,
    cargando,
    agregarVisado,
    agregarAprobado,
    alerta,
    etapa,
    obtenerEtapa,
  } = useProcesos();

  const params = useParams();

  const idEtapa = params.id;

  useEffect(() => {
    obtenerEtapa(params.id);
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h2 className="text-1xl font-bold text-sky-900">
        {" "}
        Etapa: {etapa.nombre}
      </h2>

      <div className="bg-white p-5 m-5 rounded-lg shadow">
        <Visados key={idEtapa} etapa={idEtapa} />
      </div>

      <div className="bg-white p-5 m-5 rounded-lg shadow">
        <Aprobados key={idEtapa} etapa={idEtapa} />
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        participante?.id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>

              {msg && <Alerta alerta={alerta} />}

              <div className="flex gap-4 justify-between items-center">
                <p>{participante.nombre}</p>
                <button
                  type="button"
                  className="bg-cyan-600 hover:bg-cyan-800 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarVisado({
                      etapa: idEtapa,
                      email: participante.mail,
                    })
                  }
                >
                  Agregar para visado
                </button>
                <button
                  type="button"
                  className="bg-lime-600 hover:bg-lime-800 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarAprobado({
                      etapa: idEtapa,
                      email: participante.mail,
                    })
                  }
                >
                  Agregar para aprobar
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ConfigurarEtapa;
