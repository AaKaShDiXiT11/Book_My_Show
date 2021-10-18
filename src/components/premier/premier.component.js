import React from "react";
import Slider from "react-slick";

import Poster from "../Poster/poster.component.js";

import settings from "../../config/PosterCarousal"

//images
import PremierImages from "../../config/TempPoster.config"

export const Premier =() => {
    //responsivness:
  return (
    <>
    <div className="flex flex-col items-start py-4">
    <h3 className="text-white test-xl font-bold">premier</h3>
    <p className="text-white test-xl ">Bramd new release every friday</p>
    </div>
    <Slider{...settings}>
{PremierImages.map((image)=> (
  <Poster {...image} isDark/>
))}
    </Slider>
    </>
  );
};

export default Premier;
