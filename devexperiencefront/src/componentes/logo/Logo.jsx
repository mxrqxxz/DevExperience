import React from "react";
import './logo.css'
import logo from '../../assets/imgs/tfgPositivo.svg'
import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to={'/'}>
            <img className="logo" src={logo} alt="Logo DevExperience" />
        </Link>
    )

}
