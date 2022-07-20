import { useState, useEffect } from "react";

import useProcesos from "../hooks/useProcesos";

const PRIORIDAD = ["Baja", "Media", "Alta"];

const Etapa = ({ etapa }) => {
  const { nombre, descripcion, prioridad, visados, aprobados } = etapa;
  const { cargando } = useProcesos();

  if (cargando) return "Cargando...";

  return (
    <>
      <div className="p-5 border-2 border-sky-900 bg-white shadow mt-5 rounded-lg">
        <p className="text-1xl font-bold text-sky-900 text-center">{nombre}</p>
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sky-600">{descripcion}</p>
            <p className="text-sm text-slate-600">
              Prioridad: {PRIORIDAD[prioridad - 1]}
            </p>
          </div>
          <div>
            <p className="underline text-blue-500">Visado</p>
            <ol>
              {visados.map((user) => (
                <li key={user.id}>{user.nombre}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="underline text-teal-500">Aprobado</p>
            <ol>
              {aprobados.map((user) => (
                <li key={user.id}>{user.nombre}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default Etapa;
