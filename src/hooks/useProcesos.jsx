import { useContext } from "react";
import ProcesosContext from "../context/ProcesosProvider";

const useProcesos = () => {
  return useContext(ProcesosContext);
};

export default useProcesos;
