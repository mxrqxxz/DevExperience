import React from "react";
import './enlace.css'
import { Link, useLocation } from "react-router-dom";

function Enlace(props) {
    const location = useLocation();
    return (
        <Link to={props.to} className={`enlaceNavbar ${location.pathname === props.to ? 'active' : ''}`} style={{color: props.color}}>
            {props.texto}
        </Link>
    )

}

export default Enlace;