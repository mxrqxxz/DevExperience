import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode,Autoplay } from 'swiper/modules';
import imagen1 from '../../assets/imgs/DarkMode.svg';
import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export function CarouselHome(props) {
    return (
        <Swiper
            modules={[FreeMode,Autoplay]}
            spaceBetween={30}
            freeMode={true}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
            }}
            speed={7000} 
            loop={true} 
            slidesPerView={3}
        >
            <SwiperSlide><img src={imagen1} alt="Logo1" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo2" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo3" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo4" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo5" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo6" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo7" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo8" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo9" /></SwiperSlide>
            <SwiperSlide><img src={imagen1} alt="Logo10" /></SwiperSlide>

        </Swiper>
    );
}
