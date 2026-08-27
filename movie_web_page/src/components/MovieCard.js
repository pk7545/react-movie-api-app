import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {

  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();


  // Check favorite movie
  useEffect(() => {

    if (!movie) {
      return;
    }

    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === currentUser
    );

    if (user) {

      const favorites = user.favorites || [];

      const movieExists = favorites.some(
        (item) => item.id === movie.id
      );

      setIsFavorite(movieExists);
    }

  }, [movie]);


  // If movie is not available
  if (!movie) {
    return null;
  }


  // Movie poster
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";


  // Movie title
  const title =
    movie.title ||
    movie.name ||
    "Untitled";


  // Movie rating
  const rating =
    movie.vote_average !== undefined &&
    movie.vote_average !== null
      ? movie.vote_average.toFixed(1)
      : "N/A";


  // Movie release date
  const releaseDate =
    movie.release_date ||
    movie.first_air_date ||
    "Unknown";


  // Add or remove favorite
  const toggleFavorite = (event) => {

    // Don't open movie details
    event.stopPropagation();


    const currentUser =
      localStorage.getItem("currentUser");


    // Check login
    if (!currentUser) {

      alert("Please login first!");

      return;
    }


    // Get users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];


    // Find current user
    const userIndex = users.findIndex(
      (u) => u.email === currentUser
    );


    if (userIndex === -1) {
      return;
    }


    // Get current favorites
    let favorites =
      users[userIndex].favorites || [];


    // Check movie already exists
    const movieExists = favorites.some(
      (item) => item.id === movie.id
    );


    if (movieExists) {

      // Remove movie
      favorites = favorites.filter(
        (item) => item.id !== movie.id
      );

      setIsFavorite(false);

    } else {

      // Add movie
      favorites.push(movie);

      setIsFavorite(true);
    }


    // Save updated favorites
    users[userIndex].favorites = favorites;

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

  };


  // Open movie details
  const goToDetails = () => {

    navigate(`/movie/${movie.id}`);

  };


  return (

    <div
      onClick={goToDetails}
      className="
        bg-gray-900
        rounded-xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transform
        hover:-translate-y-2
        transition-all
        duration-300
        w-full
        max-w-[220px]
        mx-auto
        relative
        cursor-pointer
      "
    >

      {/* Favorite Button */}

      <button
        onClick={toggleFavorite}
        className="
          absolute
          top-2
          right-2
          z-10
          bg-black/60
          hover:bg-black/80
          rounded-full
          p-2
          transition
        "
      >

        {isFavorite ? (

          <span className="text-red-500 text-xl">
            ❤️
          </span>

        ) : (

          <span className="text-white text-xl">
            🤍
          </span>

        )}

      </button>


      {/* Movie Poster */}

      <img
        src={posterUrl}
        alt={title}
        className="
          w-full
          h-80
          object-cover
          bg-gray-800
        "
        loading="lazy"
      />


      {/* Movie Information */}

      <div className="p-3 sm:p-4">

        {/* Movie Title */}

        <h3
          className="
            text-white
            font-semibold
            text-sm
            sm:text-base
            leading-tight
            line-clamp-2
            min-h-[2.5rem]
            mb-2
          "
        >
          {title}
        </h3>


        {/* Rating */}

        <p className="text-yellow-400 text-sm mb-1">
          ⭐ {rating}
        </p>


        {/* Release Date */}

        <p className="text-gray-400 text-xs sm:text-sm">
          {releaseDate}
        </p>

      </div>

    </div>

  );
}

export default MovieCard;