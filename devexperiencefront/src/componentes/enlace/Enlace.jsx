import React from "react";
import './enlace.css'
import { Link } from "react-router-dom";

export function Enlace(props) {
    return (
        <div className="col-1 caja-logo">
            <Link to={props.to}>
                    {props.texto}
            </Link>
        </div>
    )

}
