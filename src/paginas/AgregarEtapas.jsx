import useProcesos from "../hooks/useProcesos";

const AgregarEtapas = () => {
  const { proceso } = useProcesos();

  return (
    <>
      <h1 className="text-1xl font-bold text-sky-900">
        Añadir etapas: {proceso.nombre}
      </h1>
    </>
  );
};

export default AgregarEtapas;
