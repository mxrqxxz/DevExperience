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
import { UserProvider } from './contextos/UserContext';

function App() {

  useEffect(() => {
    AOS.init({
      once: true,
    });

  }, []);


  function recuperarDarkmode() {
    const darkmodeValue = localStorage.getItem("darkmode");

    if (darkmodeValue === null) {
      localStorage.setItem("darkmode", "false");
      return false;
    }

    return darkmodeValue === "true";
  }

  const darkmodeInicial = recuperarDarkmode();

  const [infoGuardada, setInfoGuardada] = useState({
    darkmode: darkmodeInicial
  });

  function cambiarDarkmode() {
    localStorage.setItem("darkmode", !infoGuardada.darkmode);
    setInfoGuardada({ ...infoGuardada, darkmode: !infoGuardada.darkmode });
  }

  return (
    <UserProvider>
      <ColoresContext.Provider value={Colores}>
        <div className='container-fluid p-0'>
          <Routes>
            <Route path="/" element={<Home infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Home>}> </Route>
            <Route path="/perfil" element={<Perfil infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Perfil>}> </Route>
            <Route path="/estadisticas" element={<Estadisticas infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Estadisticas>}> </Route>
            <Route path="/empresas" element={<Empresas infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Empresas>}> </Route>
            <Route path="/empresa/:nombre" element={<Empresa infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Empresa>}> </Route>
            <Route path="/soporte" element={<Soporte infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Soporte>}> </Route>
          </Routes>
        </div>
      </ColoresContext.Provider>
    </UserProvider>
  )
}

export default App;
