import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './paginas/Home/Home';
import Perfil from './paginas/Perfil/Perfil';
import Estadisticas from './paginas/Estadisticas/Estadisticas';
import Empresas from './paginas/Empresas/Empresas';
import Empresa from './paginas/Empresa/Empresa';
import Soporte from './paginas/Soporte/Soporte';

function App() {

  function recuperarUsuario() {			
		return localStorage.getItem("user");
	}

  function recuperarDarkmode() {			
		return localStorage.getItem("darkmode");
	}

  const usuarioInicial = recuperarUsuario();
  const darkmodeInicial = recuperarDarkmode();

  const [infoGuardada, setInfoGuardada] = useState({
    usuario: usuarioInicial,
    darkmode: darkmodeInicial
  });

  useEffect(() => {
    if (infoGuardada.darkmode == null || infoGuardada.darkmode == undefined) {
      setInfoGuardada({...infoGuardada, darkmode: true});
    }
  }, [infoGuardada]);

  useEffect(() => {
    console.log('Guardado en localstorage:', infoGuardada.darkmode);
  }, []);

  function cambiarDarkmode() {
    console.log('entra');
    setInfoGuardada({...infoGuardada, darkmode: !infoGuardada.darkmode});			
  }

  return (
      <div className='container-fluid'>
        <Routes>
          <Route path="/" element={<Home infoGuardada={infoGuardada} cambiarDarkmode={cambiarDarkmode}></Home>}> </Route>
          <Route path="/perfil" element={<Perfil></Perfil>}> </Route>
          <Route path="/estadisticas" element={<Estadisticas></Estadisticas>}> </Route>
          <Route path="/empresas" element={<Empresas></Empresas>}> </Route>
          <Route path="/empresa/:nombre" element={<Empresa></Empresa>}> </Route>
          <Route path="/soporte" element={<Soporte></Soporte>}> </Route>
        </Routes>
    </div>
  )
}

export default App
