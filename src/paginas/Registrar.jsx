import { useState } from "react";
import { Link } from "react-router-dom";

import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [repetirEmail, setRepetirEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, repetirEmail, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (email !== repetirEmail) {
      setAlerta({
        msg: "Los email no coinciden",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los password no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    //Creamos usuario en la API
    try {
      const { data } = await clienteAxios.post("/usuarios", {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setEmail("");
      setRepetirEmail("");
      setPassword("");
      setRepetirPassword("");
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
      <div className="flex justify-center">
        <h1 className="text-sky-900 font-black text-6xl float-left">
          Crear cuenta
        </h1>
      </div>

      <form
        className="my-10 bg-white shadow rounded-lg p-10 border-2 border-sky-900"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-sky-900 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="nombre"
            placeholder="Ingrese su nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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
            htmlFor="email2"
          >
            Repetir Email
          </label>
          <input
            id="email2"
            type="email"
            placeholder="Repita Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirEmail}
            onChange={(e) => setRepetirEmail(e.target.value)}
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

        <div className="my-5">
          <label
            className="uppercase text-sky-900 block text-xl font-bold"
            htmlFor="password2"
          >
            Repetir Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repita Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Registro"
          className="bg-sky-900 mb-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-white hover:text-sky-900 border-2 border-sky-900 transition-colors"
        />

        {msg && <Alerta alerta={alerta} />}
      </form>

      <nav className="lg:justify-between">
        <Link className="block text-center text-white uppercase text-sm" to="/">
          Inicio de sesión
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
