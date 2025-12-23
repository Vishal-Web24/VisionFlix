import React, { useEffect, useState } from "react";
// import cardlist from "../assets/cardlist.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {Link} from "react-router"
function CardList({title, category}) {
  const [data, setData] = useState([]);
  //     const movies = [
  //   {
  //     id: 1,
  //     title: "Inception",
  //     description:
  //       "A skilled thief is given a chance at redemption if he can successfully perform an impossible task: planting an idea into someone's subconscious.",
  //     image:
  //       "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Interstellar",
  //     description:
  //       "A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.",
  //     image:
  //       "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "The Dark Knight",
  //     description:
  //       "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.",
  //     image:
  //       "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  //   },
  //   {
  //     id: 4,
  //     title: "Avatar",
  //     description:
  //       "A paraplegic Marine is dispatched to the moon Pandora on a unique mission but becomes torn between following orders and protecting its people.",
  //     image:
  //       "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  //   },
  //   {
  //     id: 5,
  //     title: "Fight Club",
  //     description:
  //       "An insomniac office worker and a soap maker form an underground fight club that evolves into something much more.",
  //     image:
  //       "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
  //   },
  // ];

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
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setData(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="text-white md:px-4 ">
      <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className="myswiper">
        {data.map((item, index) => (
          <SwiperSlide key={index} className="max-w-72">
            <Link to={`/movie/${item.id}`}>
            <img
              className="h-44 w-full object-center"
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
              alt=""
            />
            <p className="text-center pt-2">{item.original_title}</p>
               </Link>
          </SwiperSlide>
       
        ))}
      </Swiper>
    </div>
  );
}

export default CardList;
