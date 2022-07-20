import { Link } from "react-router-dom";

const PreviewEnCurso = ({ proceso }) => {
  return (
    <div className="border-2 border-sky-900 py-5 px-10 flex flex-col md:flex-row justify-between bg-white shadow mt-5 rounded-lg">
      <div className="flex items-center gap-5 w-full">
        <p className="text-sky-900 font-bold w-full">{proceso.titulo}</p>
        <p className="text-sm text-sky-500 uppercase font-light w-full">
          {proceso.descripcion}
        </p>

        <span className="text-indigo-900">Etapa Actual: </span>
        <span className="text-indigo-600">{proceso.nombre}</span>
        <Link
          to={`/en-curso/${proceso.ejecutadoid}`}
          className="text-indigo-900 hover:text-indigo-500 uppercase text-sm font-bold flex items-center"
        >
          Ver
        </Link>
      </div>
    </div>
  );
};

export default PreviewEnCurso;
