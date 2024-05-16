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
import Login from './paginas/Login/Login';

function App() {

  useEffect(() => {
    AOS.init({
      once: true,
    });

  }, []);

  function recuperarUsuario() {
    const usuarioRecuperado = localStorage.getItem("user");

    if (usuarioRecuperado === null || usuarioRecuperado === "") {
      const usuarioInicial = {
        token: "Sin definir",
        foto: "Sin definir",
      }
      localStorage.setItem("user", JSON.stringify(usuarioInicial));
      return usuarioInicial;
    }
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

  const [infoGuardada, setInfoGuardada] = useState({
    usuario: usuarioInicial,
    darkmode: darkmodeInicial
  });

  function cambiarDarkmode() {
    localStorage.setItem("darkmode", !infoGuardada.darkmode);
    setInfoGuardada({ ...infoGuardada, darkmode: !infoGuardada.darkmode });
  }

  function cambiarUsuario(usuarioNuevo) {
    localStorage.setItem("user", JSON.stringify(usuarioNuevo));
    setInfoGuardada({ ...infoGuardada, usuario: usuarioNuevo });
    console.log(usuarioNuevo);
  }

  useEffect(() => {
    console.log(infoGuardada);
  }, [infoGuardada]);


  return (
      <ColoresContext.Provider value={Colores}>
        <div className='container-fluid p-0'>
          <Routes>
            <Route path="/" element={<Home infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Home>}> </Route>
            <Route path="/perfil" element={<Perfil infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Perfil>}> </Route>
            <Route path="/estadisticas" element={<Estadisticas infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Estadisticas>}> </Route>
            <Route path="/empresas" element={<Empresas infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Empresas>}> </Route>
            <Route path="/empresa/:nombre" element={<Empresa infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Empresa>}> </Route>
            <Route path="/soporte" element={<Soporte infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Soporte>}> </Route>
            <Route path="/login" element={<Login cambiarUsuario={cambiarUsuario}></Login>} />
          </Routes>
        </div>
      </ColoresContext.Provider>
  )
}

export default App;
