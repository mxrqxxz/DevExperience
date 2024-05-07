import React from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';

function Home(props) {
    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Home</h1>
        </div>
    );
}

export default Home;