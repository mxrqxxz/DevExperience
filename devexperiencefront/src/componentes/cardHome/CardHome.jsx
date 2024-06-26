import React from "react";
import './CardHome.css';

function CardHome(props) {
    return (
        <div className="col-12 col-md-4">
            <div className="cardHome mb-5">
                <img className="imgCardHome" src={props.foto} alt="Foto de la carta" />
                <h2 className="titleCardHome">{props.titulo}</h2>
                <p className="numberCardHome">{props.texto}</p>
            </div>
        </div>
    );
}

export default CardHome;