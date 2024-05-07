import React from "react";
import './logo.css'
import logoLigth from '../../assets/imgs/tfgPositivo.svg'
import logoDark from '../../assets/imgs/tfgNegativo.svg'
import { Link } from "react-router-dom";

export function Logo(props) {

    return (
        <Link to={'/'}>
            <img className="logo" src={props.tema === true ? logoDark : logoLigth} alt="Logo DevExperience" />
        </Link>
    )

}
