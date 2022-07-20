import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import Usuario from "./paginas/Usuario";
import Procesos from "./paginas/Procesos";
import NuevoProceso from "./paginas/NuevoProceso";
import Proceso from "./paginas/Proceso";
import EditarProceso from "./paginas/EditarProceso";
import AgregarEtapas from "./paginas/AgregarEtapas";
import ConfigurarEtapa from "./paginas/ConfigurarEtapa";
import VerProceso from "./paginas/VerProceso";
import EnCurso from "./paginas/EnCurso";
import VerProcesoCurso from "./paginas/VerProcesoCurso";
import UserVisado from "./paginas/UserVisado";

import { AuthProvider } from "./context/AuthProvider";
import { ProcesosProvider } from "./context/ProcesosProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProcesosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
            </Route>

            <Route path="/inicio-usuario" element={<RutaProtegida />}>
              <Route index element={<Usuario />} />
            </Route>

            <Route path="/en-curso" element={<RutaProtegida />}>
              <Route index element={<EnCurso />} />
              <Route path=":ejecutado" element={<VerProcesoCurso />} />
              <Route
                path="visado/:ejecutado/:iduser"
                element={<UserVisado />}
              />
              <Route
                path="aprobado/:ejecutado/:iduser"
                element={<UserVisado />}
              />
            </Route>

            <Route path="/procesos" element={<RutaProtegida />}>
              <Route index element={<Procesos />} />
              <Route path="listar-procesos" element={<Procesos />} />
              <Route path="crear-proceso" element={<NuevoProceso />} />
              <Route path=":id" element={<Proceso />} />
              <Route path="ver-proceso/:id" element={<VerProceso />} />
              <Route path="editar/:id" element={<EditarProceso />} />
              <Route path=":id/agregar-etapas" element={<AgregarEtapas />} />
              <Route path="etapa/:id" element={<ConfigurarEtapa />} />
            </Route>
          </Routes>
        </ProcesosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
