import React from "react";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const MovieCard = ({
  id,
  title,
  vote_average,
  poster_path,
  release_date,
  original_language,
}) => {
  return (
    <Link
      to={"/movieDetail/" + id}
      className={`movie-card bg-gray-700 p-5 rounded-2xl shadow-inner shdow-light-100/10`}
    >
      <img
        src={
          poster_path
            ? "https://image.tmdb.org/t/p/w500/" + poster_path
            : "/no-movie.png"
        }
        alt=""
      />
      <div className="mt-4">
        <h3>{title}</h3>
      </div>
      <div className="flex items-center gap-1 mt-3 text-sm">
        <FaStar color="yellow" />
        <span>{vote_average.toFixed(2)}</span>
        <GoDotFill size={10} />
        <span className="first-letter:uppercase">{original_language}</span>
        <GoDotFill size={10} />
        <span className="">{release_date}</span>
      </div>
    </Link>
  );
};

export default MovieCard;
