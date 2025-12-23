import React, { useEffect, useState } from "react";
// import hero from "../assets/hero.jpg";
import { Bookmark, Play } from "lucide-react";
import { Link } from "react-router";
const Hero = () => {
  const [movie, setMovie] = useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmE1MzI5MDg4Y2ExNTIwMGQyM2ZhMzdkMjdhNGFmYSIsIm5iZiI6MTc2NjAwMTg4NC4wNzAwMDAyLCJzdWIiOiI2OTQzMGNkYzEzNjY4ODA4NDA1NWUwZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T8i-OJyiqh1NM-mVP826rQxEiVDULizprQaxMxKf1Lk",
    },
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  if (!movie) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" relative text-white">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="bg-img"
        className="w-full rounded-2xl h-[900px] object-center object-cover"
      />
      <div className=" flex space-x-2  md:space-x-4 absolute bottom-10  left-4 md:bottom-8 md:left-10 font-medium">
        <button className="flex justify-center items-center  bg-white hover:bg-green-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for later
        </button>
         <Link to={`/movie/${movie.id}`}>
        <button className="flex justify-center items-center bg-[#e50914] hover:bg-green-200 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <Play /> Watch Now
        </button>
             </Link>
      </div>
     
    </div>
  );
};

export default Hero;
