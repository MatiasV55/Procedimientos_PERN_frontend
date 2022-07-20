import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import clienteAxios from "../config/clienteAxios";

//Creación del context
const ProcesosContext = createContext();

//El provider es donde se encuentran las funciones y state
const ProcesosProvider = ({ children }) => {
  const navigate = useNavigate();

  const [procesos, setProcesos] = useState([]);
  const [proceso, setProceso] = useState({});
  const [etapa, setEtapa] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [etapas, setEtapas] = useState([]);
  const [participante, setParticipante] = useState({});
  const [procesosCorriendo, setProcesosCorriendo] = useState([]);

  const [visados, setVisados] = useState({});
  const [aprobados, setAprobados] = useState({});
  const [users, setUsers] = useState({});

  const [modalFormularioProceso, setModalFormularioProceso] = useState(false);
  const [modalInitProcedimiento, setModalInitProcedimiento] = useState(false);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const obtenerProcesos = async () => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************

      const { data } = await clienteAxios("/procesos", config);
      setProcesos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitProceso = async (proceso) => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************
      const { data } = await clienteAxios.post("/procesos", proceso, config);

      setProcesos([...procesos, data]);

      setAlerta({
        msg: "Procedimiento creado con éxito",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/procesos/listar-procesos");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProceso = async (id) => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************

      const { data } = await clienteAxios.delete(`/procesos/${id}`, config);

      //Redireccionar
      setTimeout(() => {
        setAlerta({});
        navigate("/inicio-usuario");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProceso = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/procesos/${id}`, config);
      setProceso(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerEtapas = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/etapas/proceso/${id}`, config);
      setEtapas(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerEtapa = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/etapas/${id}`, config);
      setEtapa(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const submitEtapa = async (etapa) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/etapas/${etapa.id}`,
        etapa,
        config
      );

      //Mostrar alerta
      setAlerta({
        msg: "Etapa actualizada",
        error: false,
      });

      //Actualizar el DOM
      const etapasActualizadas = { ...etapas };
      for (let i in etapasActualizadas) {
        if (etapasActualizadas[i].id === data.id) {
          etapasActualizadas[i] = data;
        }
      }

      //Redirecciono
      setTimeout(() => {
        setAlerta({});
        navigate("/procesos/listar-procesos");
        setEtapas(etapasActualizadas);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalProceso = () => {
    setModalFormularioProceso(!modalFormularioProceso);
  };

  const editProceso = async (proceso) => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************
      const { id } = proceso;
      const { data } = await clienteAxios.put(
        `/procesos/${id}`,
        proceso,
        config
      );

      //Actualizar el DOM
      const procesosActualizados = { ...procesos };
      for (let i in procesosActualizados) {
        if (procesosActualizados[i].id === data.id) {
          procesosActualizados[i] = data;
        }
      }

      setAlerta({
        msg: "Procedimiento editado",
        error: false,
      });

      setModalFormularioProceso(false);

      //Redireccionar
      setTimeout(() => {
        setAlerta({});
        navigate(`/procesos/listar-procesos`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************
      const { data } = await clienteAxios.post(
        "/etapas/participantes",
        { email },
        config
      );
      setParticipante(data);
      setAlerta({});
      setTimeout(() => {
        setParticipante({});
      }, 10000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } finally {
      setCargando(false);
    }
  };

  const agregarVisado = async (obj) => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************
      const { etapa } = obj;
      const { data } = await clienteAxios.post(
        `/etapas/${etapa}/agregar-visado`,
        { obj },
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    }
  };

  const agregarAprobado = async (obj) => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************
      const { etapa } = obj;
      const { data } = await clienteAxios.post(
        `/etapas/${etapa}/agregar-aprobado`,
        { obj },
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    }
  };

  const obtenerVisados = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/etapas/visados/${id}`, config);
      setVisados(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerAprobados = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/etapas/aprobados/${id}`, config);
      setAprobados(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarColaborador = async (colaborador) => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************

      const { data } = await clienteAxios.post(
        `/etapas/${etapa.id}/eliminar-colaborador`,
        colaborador,
        config
      );
      console.log(data);
      //Redirecciono
      setTimeout(() => {
        navigate(`procesos/${proceso.id}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalIniciarProceso = (proceso) => {
    setProceso(proceso);
    setModalInitProcedimiento(!modalInitProcedimiento);
  };

  const inicioProcedimiento = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/procesos/${id}/iniciar`, config);
      console.log(data);

      setModalInitProcedimiento(false);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerEnCurso = async () => {
    setCargando(true);
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************

      const { data } = await clienteAxios("/procesos/ejecutados", config);
      setProcesosCorriendo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerUsers = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/etapas/ejecutado-users/${id}`,
        config
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerEtapaByExecuted = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/etapas/ejecutado-etapa/${id}`,
        config
      );
      setEtapa(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const submitCheck = async (userobj) => {
    try {
      //SETEO DE CONFIG CON TOKEN PARA AUTORIZAR LA CONSULTA *****
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //***********************************************************

      const { data } = await clienteAxios.put(
        `/etapas/user-update/${userobj.usuario}`,
        userobj,
        config
      );

      setAlerta({
        msg: "Etapa actualizada con éxito !!!",
        error: false,
      });

      //Redireccionar
      setTimeout(() => {
        setAlerta({});
        navigate(`/en-curso/${userobj.ejecutado}`);
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
        navigate(`/`);
      }, 3000);
    }
  };

  const cerrarSesionProcesos = () => {
    setProceso({});
    setProcesos([]);
    setAlerta({});
    setEtapa({});
    setEtapas([]);
  };

  return (
    <ProcesosContext.Provider
      value={{
        procesos,
        obtenerProcesos,
        mostrarAlerta,
        alerta,
        submitProceso,
        proceso,
        eliminarProceso,
        obtenerProceso,
        cargando,
        obtenerEtapas,
        etapas,
        obtenerEtapa,
        etapa,
        submitEtapa,
        modalFormularioProceso,
        handleModalProceso,
        editProceso,
        submitColaborador,
        participante,
        agregarVisado,
        agregarAprobado,
        obtenerVisados,
        visados,
        obtenerAprobados,
        aprobados,
        eliminarColaborador,
        modalInitProcedimiento,
        handleModalIniciarProceso,
        inicioProcedimiento,
        obtenerEnCurso,
        procesosCorriendo,
        obtenerUsers,
        users,
        obtenerEtapaByExecuted,
        submitCheck,
        cerrarSesionProcesos,
      }}
    >
      {children}
    </ProcesosContext.Provider>
  );
};

export { ProcesosProvider };

export default ProcesosContext;
