import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MovieDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;


  // Movie information
  const [movie, setMovie] = useState(null);

  // Cast information
  const [cast, setCast] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState(null);

  // Favorite state
  const [isFavorite, setIsFavorite] = useState(false);


  // Fetch movie details
  useEffect(() => {

    const fetchMovieDetails = async () => {

      try {

        setLoading(true);
        setError(null);


        // ==============================
        // 1. MOVIE DETAILS
        // ==============================

        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );


        if (!movieRes.ok) {

          throw new Error("Movie not found");

        }


        const movieData = await movieRes.json();


        setMovie(movieData);


        // ==============================
        // 2. CHECK FAVORITE
        // ==============================

        const currentUser =
          localStorage.getItem("currentUser");


        if (currentUser) {

          const users =
            JSON.parse(localStorage.getItem("users")) || [];


          const user = users.find(
            (u) => u.email === currentUser
          );


          if (user) {

            const favorites =
              user.favorites || [];


            const movieExists =
              favorites.some(
                (item) => item.id === movieData.id
              );


            setIsFavorite(movieExists);

          }

        }


        // ==============================
        // 3. CAST & CREW
        // ==============================

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );


        const creditsData =
          await creditsRes.json();


        setCast(
          creditsData.cast || []
        );


      } catch (err) {

        console.error(err);

        setError(
          "Failed to load movie details"
        );

      } finally {

        setLoading(false);

      }

    };


    if (id) {

      fetchMovieDetails();

    }

  }, [id, API_KEY]);


  // ====================================
  // ADD / REMOVE FAVORITE
  // ====================================

  const toggleFavorite = () => {

    // Get current logged-in user
    const currentUser =
      localStorage.getItem("currentUser");


    // User not logged in
    if (!currentUser) {

      alert("Please login first!");

      return;

    }


    // Get users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];


    // Find current user
    const userIndex =
      users.findIndex(
        (u) => u.email === currentUser
      );


    // User not found
    if (userIndex === -1) {

      alert("User not found!");

      return;

    }


    // Get existing favorites
    let favorites =
      users[userIndex].favorites || [];


    // Check whether movie already exists
    const movieExists =
      favorites.some(
        (item) => item.id === movie.id
      );


    // ==============================
    // REMOVE FAVORITE
    // ==============================

    if (movieExists) {

      favorites =
        favorites.filter(
          (item) => item.id !== movie.id
        );


      setIsFavorite(false);

    }

    // ==============================
    // ADD FAVORITE
    // ==============================

    else {

      favorites.push(movie);

      setIsFavorite(true);

    }


    // Update user favorites
    users[userIndex].favorites =
      favorites;


    // Save users
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

  };


  // ====================================
  // LOADING
  // ====================================

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

        <p className="text-xl">
          Loading movie details...
        </p>

      </div>

    );

  }


  // ====================================
  // ERROR
  // ====================================

  if (error || !movie) {

    return (

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">

        <p className="text-xl text-red-400">
          {error || "Movie not found"}
        </p>


        <button
          onClick={() => navigate("/movies")}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg"
        >
          Go Back
        </button>

      </div>

    );

  }


  // ====================================
  // POSTER URL
  // ====================================

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";


  // ====================================
  // BACKDROP URL
  // ====================================

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;


  // ====================================
  // FORMAT MONEY
  // ====================================

  const formatMoney = (amount) => {

    if (!amount || amount === 0) {

      return "Not Available";

    }


    return new Intl.NumberFormat("en-US", {

      style: "currency",

      currency: "USD",

      maximumFractionDigits: 0,

    }).format(amount);

  };


  // ====================================
  // TOP 10 ACTORS
  // ====================================

  const topActors =
    cast.slice(0, 10);


  // ====================================
  // PAGE
  // ====================================

  return (

    <div className="min-h-screen bg-gray-900 text-white">


      {/* HEADER */}

      <Header showSearch={false} />


      {/* ==================================
          BACKDROP
      ================================== */}

      {backdropUrl && (

        <div
          className="h-64 md:h-80 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${backdropUrl})`
          }}
        >

          <div className="absolute inset-0 bg-black/60"></div>

        </div>

      )}


      {/* ==================================
          MAIN
      ================================== */}

      <main className="max-w-6xl mx-auto px-4 -mt-32 relative z-10 pb-16">


        {/* ==================================
            TOP SECTION
        ================================== */}

        <div className="flex flex-col md:flex-row gap-8">


          {/* ==================================
              POSTER
          ================================== */}

          <div className="flex-shrink-0 mx-auto md:mx-0">

            <img
              src={posterUrl}
              alt={movie.title}
              className="w-64 md:w-72 rounded-xl shadow-2xl"
            />

          </div>


          {/* ==================================
              MOVIE INFORMATION
          ================================== */}

          <div className="flex-1">


            {/* TITLE */}

            <h1 className="text-3xl md:text-4xl font-bold mb-3">

              {movie.title}

            </h1>


            {/* RATING / DATE / RUNTIME */}

            <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-4">

              <span className="text-yellow-400 font-medium">

                ⭐{" "}
                {movie.vote_average?.toFixed(1) || "N/A"}

              </span>


              <span>
                •
              </span>


              <span>

                {movie.release_date || "Unknown"}

              </span>


              <span>
                •
              </span>


              <span>

                {movie.runtime
                  ? `${movie.runtime} min`
                  : "N/A"}

              </span>

            </div>


            {/* ==================================
                FAVORITE BUTTON
            ================================== */}

            <button
              onClick={toggleFavorite}
              className="
                mb-6
                px-5
                py-3
                bg-gray-800
                hover:bg-gray-700
                rounded-lg
                font-medium
                transition
                flex
                items-center
                gap-2
              "
            >

              {isFavorite ? (

                <>
                  <span className="text-red-500 text-xl">
                    ❤️
                  </span>

                  <span>
                    Remove from Favorites
                  </span>
                </>

              ) : (

                <>
                  <span className="text-xl">
                    🤍
                  </span>

                  <span>
                    Add to Favorites
                  </span>
                </>

              )}

            </button>


            {/* ==================================
                GENRES
            ================================== */}

            <div className="flex flex-wrap gap-2 mb-6">

              {movie.genres?.map((genre) => (

                <span
                  key={genre.id}
                  className="
                    px-3
                    py-1
                    bg-pink-600/30
                    text-pink-300
                    rounded-full
                    text-sm
                  "
                >

                  {genre.name}

                </span>

              ))}

            </div>


            {/* ==================================
                OVERVIEW
            ================================== */}

            <h3 className="text-xl font-semibold mb-2">

              Overview

            </h3>


            <p className="text-gray-300 leading-relaxed mb-6">

              {movie.overview ||
                "No overview available."}

            </p>


            {/* ==================================
                EXTRA INFORMATION
            ================================== */}

            <div className="grid grid-cols-2 gap-4 text-sm">


              {/* STATUS */}

              <div>

                <p className="text-gray-400">
                  Status
                </p>

                <p className="font-medium">
                  {movie.status || "N/A"}
                </p>

              </div>


              {/* LANGUAGE */}

              <div>

                <p className="text-gray-400">
                  Original Language
                </p>

                <p className="font-medium uppercase">

                  {movie.original_language ||
                    "N/A"}

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==================================
            BOTTOM SECTION
        ================================== */}

        <div className="mt-16">


          {/* ==================================
              BUDGET & REVENUE
          ================================== */}

          <div className="bg-gray-800 rounded-xl p-6 mb-10">

            <h2 className="text-2xl font-bold mb-4">

              Budget & Revenue

            </h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">


              {/* BUDGET */}

              <div>

                <p className="text-gray-400 text-sm">

                  Budget

                </p>

                <p className="text-xl font-semibold text-green-400">

                  {formatMoney(movie.budget)}

                </p>

              </div>


              {/* REVENUE */}

              <div>

                <p className="text-gray-400 text-sm">

                  Revenue

                </p>

                <p className="text-xl font-semibold text-yellow-400">

                  {formatMoney(movie.revenue)}

                </p>

              </div>

            </div>

          </div>


          {/* ==================================
              TOP ACTORS
          ================================== */}

          <div>

            <h2 className="text-2xl font-bold mb-6">

              Top Actors in this Movie

            </h2>


            {topActors.length === 0 ? (

              <p className="text-gray-400">

                No cast information available.

              </p>

            ) : (

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                {topActors.map((actor) => (

                  <div
                    key={actor.id}
                    className="bg-gray-800 rounded-xl overflow-hidden text-center"
                  >

                    {/* ACTOR IMAGE */}

                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : "https://via.placeholder.com/200x300?text=No+Photo"
                      }
                      alt={actor.name}
                      className="w-full h-48 object-cover"
                    />


                    {/* ACTOR DETAILS */}

                    <div className="p-3">

                      <p className="font-semibold text-sm">

                        {actor.name}

                      </p>


                      <p className="text-gray-400 text-xs mt-1">

                        {actor.character ||
                          "Unknown Role"}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>


        {/* ==================================
            BACK BUTTON
        ================================== */}

        <div className="mt-12 text-center">

          <button
            onClick={() => navigate(-1)}
            className="
              px-8
              py-3
              bg-pink-600
              hover:bg-pink-700
              rounded-lg
              font-medium
              transition
            "
          >

            ← Go Back

          </button>

        </div>

      </main>


      {/* FOOTER */}

      <Footer />

    </div>

  );

}


export default MovieDetails;