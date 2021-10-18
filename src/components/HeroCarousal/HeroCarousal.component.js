import React,{useState,useEffect} from "react";

import HeroSlider from "react-slick";
import axios from "axios";

//import {NextArrow,PrevArrow} from "./Arrows.component.js";
import {BsChevronLeft,BsChevronRight} from "react-icons/bs";
import {FiChevronLeft,FiChevronRight} from "react-icons/fi";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroCarousal = () => {

const [images,setImages] = useState([]);

useEffect(() => {
  const requestNowPlayingMovies = async() => {
    const getImages = await axios.get("/movie/now_playing");
    setImages(getImages.data.results);
  };
  requestNowPlayingMovies();
}, []);


  const settingsLg = {
    arrows: true,
    autoplay: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "300px",
    infinite: true,
    nextArrow: <div><BsChevronRight className="bg-gray-800 absolute bg-opacity-75 top-0 bottom-0 px-1 rounded-l-lg fill-current text-white w-11 h-11"/></div>,
    prevArrow: <div><BsChevronLeft className="bg-gray-800 absolute bg-opacity-75 top-0 bottom-0 px-1 rounded-r-lg fill-current text-white w-11 h-11"/></div>,

  }

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow:<div><BsChevronRight className="bg-gray-800 absolute bg-opacity-75 top-0 bottom-0 px-1 rounded-l-lg fill-current text-white w-11 h-11" /></div>,
    prevArrow: <div><BsChevronLeft className="bg-gray-800 absolute bg-opacity-75 top-0 bottom-0 px-1 rounded-r-lg fill-current text-white w-11 h-11"/></div>
  };



  return (
    <>
  <div className="lg:hidden">
  <HeroSlider {...settings}>
  {
    images.map((image) => (
      <div className="w-full h-64 md:h-80 py-3">
      <img src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
      alt="testing" className="w-full h-full rounded-md"/>
      </div>
    ))
  }
  </HeroSlider>
  </div>

  <div className="hidden lg:block">
  <HeroSlider {...settingsLg}>
  {
    images.map((image) => (
      <div className="w-full h-96 px-2 py-3">
      <img src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
      alt="testing" className="w-full h-full rounded-md"/>
      </div>
    ))
  }
  </HeroSlider>
  </div>
    </>
  );
};

export default HeroCarousal;
