import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Alerta from "../components/Alerta";

import useProcesos from "../hooks/useProcesos";

const UserVisado = () => {
  const sampleLocation = useLocation();
  const urlActual = sampleLocation.pathname;

  const params = useParams();
  const idUser = params.iduser;
  const idEjecutado = params.ejecutado;

  let accion;

  if (urlActual.includes("visado")) {
    accion = 1;
  } else if (urlActual.includes("aprobado")) {
    accion = 2;
  }

  const { obtenerEtapaByExecuted, etapa, cargando, submitCheck, alerta } =
    useProcesos();

  useEffect(() => {
    obtenerEtapaByExecuted(idEjecutado);
  }, []);

  useEffect(() => {
    const objeto = {
      ejecutado: idEjecutado,
      usuario: idUser,
      accion: accion,
      etapa: etapa.id,
    };

    submitCheck(objeto);
  }, [etapa]);

  const { msg } = alerta;

  if (cargando) return "Cargando...";

  return (
    <>
      <div>{msg && <Alerta alerta={alerta} />}</div>
    </>
  );
};

export default UserVisado;
