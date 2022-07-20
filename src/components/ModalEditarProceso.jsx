import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useProcesos from "../hooks/useProcesos";
import Alerta from "./Alerta";

const ModalEditarProceso = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const {
    modalFormularioProceso,
    handleModalProceso,
    alerta,
    mostrarAlerta,
    proceso,
    editProceso,
  } = useProcesos();

  const params = useParams();

  useEffect(() => {
    setTitulo(proceso.titulo);
    setDescripcion(proceso.descripcion);
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if ([titulo, descripcion].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    //Pasar los datos hacia el provider
    await editProceso({ id: params.id, titulo, descripcion });
    //setTitulo("");
    //setDescripcion("");
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalFormularioProceso} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalProceso}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalProceso}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Editar proceso
                  </Dialog.Title>

                  <form className="my-10" onSubmit={handleEditSubmit}>
                    {msg && <Alerta alerta={alerta} />}

                    <div className="mb-5">
                      <label
                        className="text-sky-900 uppercase font-bold text-sm"
                        htmlFor="nombre"
                      >
                        Nombre proceso
                      </label>

                      <input
                        id="nombre"
                        type="text"
                        className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
                        placeholder="Nombre del proceso"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-sky-900 uppercase font-bold text-sm"
                        htmlFor="descripcion"
                      >
                        Descripción
                      </label>

                      <textarea
                        id="descripcion"
                        className="border w-full p-2 mt-2 placeholder-sky-400 rounded-md"
                        placeholder="Descripción procedimiento"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      value="Editar"
                      className="bg-sky-900 text-white hover:text-sky-900 hover:bg-white w-full p-3 uppercase font-bold rounded cursor-pointer transition-colors border-2 border-sky-900"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalEditarProceso;
