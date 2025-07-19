import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import axios from "axios";
import Spinner from "../components/Spinner";
import MovieCard from "../components/movieCard";

import { useDebounce } from "react-use";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const Home = () => {
  const [searchInput, setSearchInput] = useState(() => {
    return localStorage.getItem("searchInput") || "";
  });

  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [debounceSearchInput, setDebounceSearchInput] = useState("");

  const [isLoadingTrending, setIsLoadingTrending] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorTrending, setErrorTrending] = useState("");

  useDebounce(
    () => {
      setDebounceSearchInput(searchInput);
    },
    1000,
    [searchInput]
  );
  const fetchMovies = async (query = "") => {
    try {
      console.log("apikey", API_KEY);

      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${query}`
        : `${API_BASE_URL}/discover/movie?sort_by=populatity.desc`;

      setIsLoading(true);
      const res = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const data = res.data;
      console.log("data", data);
      setMovies(data.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErrorMessage("Error fetching movies, Please try again later.");
    }
  };

  useEffect(() => {
    localStorage.setItem("searchInput", debounceSearchInput);
    fetchMovies(debounceSearchInput);
  }, [debounceSearchInput]);

  const fetchTrendingMovies = async () => {
    console.log("In fetchTrending movies");
    setIsLoadingTrending(true);
    try {
      const res = await axios.get(
        API_BASE_URL + "/trending/movie/day?language=en-US",
        {
          headers: {
            Authorization: "Bearer " + API_KEY,
          },
        }
      );

      const data = res.data;

      setTrendingMovies(data.results);

      setIsLoadingTrending(false);
    } catch (error) {
      setErrorTrending("Error occured while loading trending movies!");
      setIsLoadingTrending(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  const handleSearchInputChange = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };
  return (
    //bg-linear-to-r  from-[#000000] to-[#130F40]
    <main
      className="Home min-h-screen font-[poppins]
    w-full bg-[url('/hero-bg.png')] p-5 text-white
     "
    >
      <header className="max-w-[1200px] mx-auto">
        <img src="/hero.png" alt="" className="mx-auto" />
        <h1 className=" text-center text-4xl text-white p-6 pt-0  w-full">
          Find{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Movies
          </span>{" "}
          You'll Enjoy without the Hassle
        </h1>
        <Search
          searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange}
        />
      </header>

      <section className="trending-movies max-w-[1200px] mx-auto">
        <h2 className="my-[20px] font-semibold text-xl">
          Top 5 Trending movies for Today
        </h2>
        {isLoadingTrending ? (
          <div className="w-full h-[300px]">
            <Spinner />
          </div>
        ) : (
          <div className="w-full overflow-auto trending-container">
            <ul className="flex  gap-5">
              {trendingMovies.slice(0, 5).map((movie, index) => (
                <li className="flex items-center" key={movie.id}>
                  <p
                    style={{
                      fontFamily: "'Bungee Outline', cursive",
                      fontSize: "80px",
                    }}
                  >
                    {index + 1}
                  </p>
                  <Link to={"/movieDetail/" + movie.id}>
                    <img
                      className="min-w-[200px]"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                      }
                      alt=""
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className="all-movies max-w-[1200px] mx-auto">
        <h2 className="my-[20px] font-semibold text-xl">All Movies</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isLoading ? (
          <div className="w-full h-[300px]">
            <Spinner />
          </div>
        ) : (
          <div
            className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5 
          gap-5 w-full justify-center"
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
