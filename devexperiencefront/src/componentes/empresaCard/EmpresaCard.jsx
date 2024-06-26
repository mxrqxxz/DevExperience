import "./EmpresaCard.css";
import BotonEnlace from "../boton-enlace/BotonEnlace";
import fotoDefault from "../../assets/imgs/empresas/portadaEmpresa.jpg";
import React from '../../assets/imgs/tecnologias/icons8-react.svg';
import Angular from '../../assets/imgs/tecnologias/icons8-angular.svg';
import VueJs from '../../assets/imgs/tecnologias/icons8-vue-js.svg';
import EmberJs from '../../assets/imgs/tecnologias/icons8-ember.svg';
import Svelte from '../../assets/imgs/tecnologias/icons8-svelte.svg';
import ExpressJs from '../../assets/imgs/tecnologias/icons8-express-js.svg';
import Django from '../../assets/imgs/tecnologias/icons8-django.svg';
import SpringBoot from '../../assets/imgs/tecnologias/icons8-spring-boot.svg';
import RubyOnRails from '../../assets/imgs/tecnologias/icons8-ruby-programming-language.svg';
import Laravel from '../../assets/imgs/tecnologias/Laravel.svg';
import Git from '../../assets/imgs/tecnologias/icons8-git.svg';
import SVN from '../../assets/imgs/tecnologias/subversion.svg';
import Mercurial from '../../assets/imgs/tecnologias/Mercurial_logo_cropped.svg';
import Perforce from '../../assets/imgs/tecnologias/perforce-icon.svg';
import MySQL from '../../assets/imgs/tecnologias/mysql.svg';
import PostgreSQL from '../../assets/imgs/tecnologias/postgresql-logo.svg';
import SQLite from '../../assets/imgs/tecnologias/icons8-sqlite.svg';
import MongoDB from '../../assets/imgs/tecnologias/icons8-mongodb.svg';
import Cassandra from '../../assets/imgs/tecnologias/apache_cassandra-icon.svg';
import { useEffect, useState } from "react";

function EmpresaCard(props) {

    const imagesMap = {
        React: React,
        Angular: Angular,
        "Vue.js": VueJs,
        "Ember.js": EmberJs,
        Svelte: Svelte,
        "Express.js": ExpressJs,
        Django: Django,
        "Spring Boot": SpringBoot,
        "Ruby on Rails": RubyOnRails,
        Laravel: Laravel,
        Git: Git,
        SVN: SVN,
        Mercurial: Mercurial,
        Perforce: Perforce,
        MySQL: MySQL,
        PostgreSQL: PostgreSQL,
        SQLite: SQLite,
        MongoDB: MongoDB,
        Cassandra: Cassandra,
    };

    const [urlFoto, setUrlFoto] = useState(fotoDefault);

    useEffect(() => {
        if (props.empresa.imagen !== null && props.empresa.imagen !== "" && props.empresa.imagen !== undefined && props.empresa.imagen !== "url_example") {
            setUrlFoto("http://devexperience.test/storage/" + props.empresa.imagen);
        }
    }, []);

    const nota = Math.round(props.empresa.notaMedia * 10) / 10;

    const colorNota = nota >= 8 ? "green" : nota >= 5 ? "yellow" : "red";

    function tecnologiasFotos(tecnologia, index) {
        return <img key={index} className="imgtecnoCard" src={imagesMap[tecnologia]} alt={`Logo de ${tecnologia}`} />
    }

    return (
        <div className="col-12 col-md-6 col-lg-4 ">
            <div className="cardEmpresa">
                <img src={urlFoto} alt="portada de la empresa" className="fotoCard" />
                <h3 className="tituloCard colorAzul">{props.empresa.nombre}</h3>
                <h3 className="notaCard" style={{ color: colorNota }} >{nota}</h3>
                <p className="seccionCard"><strong>Front-end</strong></p>
                {props.empresa.tecnologiasFront.map(tecnologiasFotos)}
                <p className="seccionCard"><strong>Back-end</strong></p>
                {props.empresa.tecnologiasBack.map(tecnologiasFotos)}
                <p className="seccionCard"><strong>Modalidad</strong></p>
                <p className="seccionCard">{props.empresa.remoto}</p>
                <BotonEnlace contenido="Saber más..." enlace={`/empresa/${props.empresa.id}`}></BotonEnlace>
            </div>
        </div>
    );
}

export default EmpresaCard;