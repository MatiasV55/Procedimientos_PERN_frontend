import FormularioProceso from "../components/FormularioProceso";

const NuevoProceso = () => {
  return (
    <>
      <h2 className="text-1xl font-bold text-sky-900">Crear Proceso</h2>

      <div className="mt-10 flex justify-center">
        <FormularioProceso />
      </div>
    </>
  );
};

export default NuevoProceso;
