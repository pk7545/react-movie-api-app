import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

function Favorites() {

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);


  // Load favorites
  useEffect(() => {

    const currentUser =
      localStorage.getItem("currentUser");


    // User not logged in
    if (!currentUser) {

      navigate("/");

      return;
    }


    // Get users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];


    // Find current user
    const user = users.find(
      (u) => u.email === currentUser
    );


    if (user) {

      setFavorites(
        user.favorites || []
      );

    }

  }, [navigate]);


  return (

    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0f172a] to-[#020617] text-white">

      <Header />


      <main className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          ❤️ My Favorite Movies
        </h1>


        {favorites.length === 0 ? (

          <div className="text-center py-20">

            <p className="text-gray-400 text-lg">
              No favorites yet
            </p>

            <p className="text-gray-500 mt-2">
              Go to Home and click 🤍 to add movies
            </p>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-5
            "
          >

            {favorites.map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

          </div>

        )}

      </main>


      <Footer />

    </div>

  );
}

export default Favorites;