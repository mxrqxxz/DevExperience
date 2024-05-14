import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home/Home';
import Perfil from './paginas/Perfil/Perfil';
import Estadisticas from './paginas/Estadisticas/Estadisticas';
import Empresas from './paginas/Empresas/Empresas';
import Empresa from './paginas/Empresa/Empresa';
import Soporte from './paginas/Soporte/Soporte';
import Colores from './mocks/colores';
import ColoresContext from './contextos/ColoresContext';
import { AuthProvider, useAuth } from './contextos/AuthContext';
import Login from './componentes/login/Login';

function App() {

  useEffect(() => {
    AOS.init({
      once: true,
    });

  }, []);

  function recuperarUsuario() {
    return localStorage.getItem("user");
  }

  function recuperarDarkmode() {
    const darkmodeValue = localStorage.getItem("darkmode");
    const colores = useContext(Colores);

    if (darkmodeValue === null) {
      localStorage.setItem("darkmode", "false");
      return false;
    }

    return darkmodeValue === "true";
  }

  const usuarioInicial = recuperarUsuario();
  const darkmodeInicial = recuperarDarkmode();
  const PrivateRoute = ({ element: Component, ...rest }) => {
    const { authToken } = useAuth();
  }
  const [infoGuardada, setInfoGuardada] = useState({
    usuario: usuarioInicial,
    darkmode: darkmodeInicial
  });

  function cambiarDarkmode() {
    localStorage.setItem("darkmode", !infoGuardada.darkmode);
    setInfoGuardada({ ...infoGuardada, darkmode: !infoGuardada.darkmode });
  }


  return (
    <AuthProvider>
      <ColoresContext.Provider value={Colores}>
        <div className='container-fluid p-0'>
          <Routes>
            <Route path="/" element={<Home infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Home>}> </Route>
            <Route path="/perfil" element={<Perfil infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Perfil>}> </Route>
            <Route path="/estadisticas" element={<Estadisticas infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Estadisticas>}> </Route>
            <Route path="/empresas" element={<Empresas infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Empresas>}> </Route>
            <Route path="/empresa/:nombre" element={<Empresa infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Empresa>}> </Route>
            <Route path="/soporte" element={<Soporte infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Soporte>}> </Route>
            <Route path="/login" element={<Login></Login>} />
          </Routes>
        </div>
      </ColoresContext.Provider>
    </AuthProvider>
  )
}

export default App;
