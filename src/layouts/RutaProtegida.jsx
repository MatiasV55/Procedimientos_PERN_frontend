import { Outlet, Navigate, Link } from "react-router-dom";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
import useProcesos from "../hooks/useProcesos";

import Sidebar from "../components/Sidebar";
import MenuButton from "../components/MenuButton";

const RutaProtegida = () => {
  const { auth, cargando, cerrarSesionAuth } = useAuth();
  const { cerrarSesionProcesos } = useProcesos();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProcesos();
    localStorage.removeItem("token");
  };

  if (cargando) {
    return "Cargando...";
  }

  return (
    <>
      {auth.id ? (
        <div className="bg-sky-100">
          <header className="px-4 py-1 bg-sky-400 border-b-sky-900 border-b-2">
            <div className="flex justify-between items-center">
              <MenuButton open={open} handleClick={handleClick} />
              <div>
                <h2 className="text-3xl text-white font-black text-center p-2 w-full">
                  Gestión de procedimientos
                </h2>
              </div>

              {/*<input
                type="search"
                placeholder="Buscar procesos"
                className="rounded-lg lg:w-96 block p-2 h-1/2"
              />*/}

              <div className="flex items-center gap-6 p-2">
                <Link
                  to="/en-curso"
                  className="font-bold uppercase text-sky-900 hover:text-white"
                >
                  En curso
                </Link>

                <button
                  type="button"
                  className="text-white text-sm bg-sky-900 hover:bg-white hover:text-sky-900 p-3 rounded-md font-bold"
                  onClick={handleCerrarSesion}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </header>

          <div className="md:flex md:min-h-screen">
            <Sidebar open={open} />
            <main className="p-10 w-screen">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
