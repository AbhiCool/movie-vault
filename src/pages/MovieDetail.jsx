import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaHome, FaPlay, FaStar } from "react-icons/fa";
import { TbRating18Plus } from "react-icons/tb";

const MovieDetail = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState("");

  const API_BASE_URL = "https://api.themoviedb.org/3";

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const loadMovieDetail = async () => {
      console.log("In loadMovieDetail");
      try {
        const res = await axios.get(
          API_BASE_URL + "/movie/" + id + "?language=en-US",
          {
            headers: {
              Authorization: "Bearer " + API_KEY,
            },
          }
        );

        const data = res.data;
        console.log("data", data);

        setMovieDetails(data);
      } catch (err) {
        console.log(err);
        setError("Error occured while fetching movie details");
      }
    };

    loadMovieDetail();
  }, []);

  if (!movieDetails) {
    return (
      <div className="w-full h-screen bg-zinc-900">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <p className="text-red-500">{errorMessage}</p>;
  }
  return (
    <main
      className="relative h-screen w-full bg-cover bg-center text-white font-[poppins]"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <section className="relative z-10 px-[10%] py-[5%] flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img
          className="w-[200px] rounded-xl shadow-lg"
          src={
            movieDetails?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`
              : "/no-movie.png"
          }
          alt={movieDetails?.title}
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">{movieDetails?.title}</h2>
            {movieDetails.adult && (
              <TbRating18Plus className="text-3xl text-red-500" />
            )}
          </div>

          <div className="flex gap-2 text-sm text-gray-400">
            <span>{movieDetails.release_date}</span>
            <span>{movieDetails.runtime}m</span>
            <span>
              {movieDetails.genres.map((genre) => genre.name).join(", ")} and
              more
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar />
            {movieDetails.vote_average.toFixed(2)}
          </div>
          <div>
            {movieDetails.homepage && (
              <a
                className="inline-flex items-center px-4 py-2 rounded-3xl bg-gray-400 gap-2 cursor-pointer"
                href={movieDetails.homepage}
              >
                <FaHome />
                Go to Home page
              </a>
            )}
          </div>
          <p className="text-lg leading-relaxed max-w-2xl text-gray-400">
            {movieDetails?.overview}
          </p>
          <div className="space-x-2">
            <span className="text-gray-600">Languages: </span>
            <span>
              {movieDetails.spoken_languages
                .map((lang) => lang.english_name)
                .join(", ")}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetail;
