import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

import sion from "../../imagenes/index.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      setAlerta({});
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/inicio-usuario");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="flow-root md:flex md:justify-center">
        <div className="lg:flex lg:justify-between">
          <h1 className="text-sky-900 font-black text-6xl float-left">
            Iniciar se
          </h1>
          <span className="float-right block">
            <img src={sion} alt="SION" />
          </span>
        </div>
      </div>

      <form
        className="my-10 bg-white shadow rounded-lg p-10 border-2 border-sky-900"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-sky-900 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-sky-900 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-900 text-white mb-5 w-full py-3 hover:text-sky-900 uppercase font-bold rounded hover:cursor-pointer hover:bg-white transition-colors border-2 border-sky-900"
        />

        {msg && <Alerta alerta={alerta} />}
      </form>

      <nav className="lg:justify-between">
        <Link
          className="block text-center text-white uppercase text-sm"
          to="/registrar"
        >
          Registrarse
        </Link>
      </nav>
    </>
  );
};

export default Login;
