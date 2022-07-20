import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = ({ open }) => {
  const { auth } = useAuth();

  if (!open) return null;

  return (
    <aside className="lg:w-60 px-5 py-10 bg-sky-400 h-full shadow-lg border-r-2 border-r-sky-900 border-b-2 border-b-sky-900">
      <p className="text-xl text-white font-bold">Hola: {auth.nombre}</p>

      <Link
        to="/procesos"
        className="bg-sky-900 text-white hover:bg-white hover:text-sky-900 w-full 
            p-2 font-bold block mt-5 text-center rounded-lg"
      >
        Iniciar Proceso
      </Link>

      <Link
        to="/procesos/crear-proceso"
        className="bg-sky-900 text-white hover:bg-white hover:text-sky-900 w-full 
            p-2 font-bold block mt-5 text-center rounded-lg"
      >
        Crear Proceso
      </Link>

      <Link
        to="/procesos/listar-procesos"
        className="bg-sky-900 text-white hover:bg-white hover:text-sky-900 w-full 
            p-2 font-bold block mt-5 text-center rounded-lg"
      >
        Editar Proceso
      </Link>
    </aside>
  );
};

export default Sidebar;
