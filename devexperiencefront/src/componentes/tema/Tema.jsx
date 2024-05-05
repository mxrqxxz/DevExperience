import React from "react";
import './tema.css'

export function Tema(props) {
    return (
        <div className="">
            <button>
                {props.tema === "claro" ? <img src="../../assets/imgs/LightMode.svg" alt="" /> : <img src="../../assets/imgs/DarkMode.svg" alt="" />}
            </button>
        </div>
    );
}

