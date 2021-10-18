import axios from "axios";
import React, {useEffect,useState} from "react";
import EntertainmentCardSlider from "../components/Entertainment/Entertainmentcard.component";
import Premier from "../components/premier/premier.component";
import PosterSlider from "../components/PosterSlider/PosterSlider.component";
import TempPosters from "../config/TempPoster.config";

const HomePage=() =>{

 const[popularMovies,setPopularMovies] = useState([]);

 useEffect(() =>{
   const requestPopularMovies = async () => {
     const getPopularMovies = await axios.get("/movie/popular");
     setPopularMovies(getPopularMovies.data.results);
   };
   requestPopularMovies();
 },[]);

console.log({popularMovies});

const[newMovies,setNewMovies] = useState([]);

useEffect(() =>{
  const requestNewMovies = async () => {
    const getNewMovies = await axios.get("/movie/top_rated");
    setNewMovies(getNewMovies.data.results);
  };
  requestNewMovies();
},[]);

console.log({newMovies});

  return (
    <>
   <div className="flex flex-col gap-10">

   <div className="container mx-auto px-4">
   <h1 className="text-2xl font-bold text-gray-800">
   The best of Entertainment
   </h1>
   <EntertainmentCardSlider />
   </div>

   <div className="bg-navCol-200 py-16 ">

   <div className="container mx-auto px-8 flex flex-col">
   <div className="flex">
    <img src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png"
    alt="Rupay"
    className="w-full h-full"
     />
   </div>
    <PosterSlider
    images={popularMovies}
    title="Premiers"
    subtitle="Brand new release every fridaay"
    isDark/>
   </div>
   </div>
   </div>

   <div className="container mx-auto px-4">
   <PosterSlider
   images={newMovies}
   title="Online Striming Events"
   isDark={false}
   />
   </div>

   <div className="container mx-auto px-4">
   <PosterSlider
   images={popularMovies}
   title="outdoor Events"
   isDark={false}
   />
   </div>
   </>
  );
};

export default HomePage;
