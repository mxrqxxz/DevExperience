import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
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
import 'swiper/css';
import './carousel.css'
import ColoresContext from '../../contextos/ColoresContext';
import { useContext } from 'react';

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
export function CarouselHome(props) {
    const colores = useContext(ColoresContext);
    return (
            <Swiper
                key={Object.keys(props.porcentajes).length}
                modules={[FreeMode, Autoplay]}
                spaceBetween={30}
                freeMode={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                speed={7000}
                loop={true}
                slidesPerView={2}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                    },
                }}
            >
                {Object.entries(props.porcentajes).map(([nombre, porcentaje], index) => (
                    <SwiperSlide key={nombre}>
                        <img className="img-carousel" src={imagesMap[nombre]} alt={`Logo de ${nombre}`} />
                        <div style={{ color: colores[props.color].Texto.principal }}>
                            <p style={{ fontSize: '30px', color: colores[props.color].Titulos.principal }}>#{index + 1}</p>
                            <p style={{ fontSize: '30px' }}>{porcentaje}%</p>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

    );
}

