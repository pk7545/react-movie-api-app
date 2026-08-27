import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieSection from "../components/MovieSection";
import {
  getPopularMovies,
  getTrendingMovies,
  getMoviesByLanguage,
  getTrendingTV,
  searchMovies,
} from "../services/tmdb";

function Home() {
  const navigate = useNavigate();

  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [tamil, setTamil] = useState([]);
  const [english, setEnglish] = useState([]);
  const [hindi, setHindi] = useState([]);
  const [webSeries, setWebSeries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      navigate("/");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === currentUser);

    if (user) {
      setFavorites(user.favorites || []);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [pop, tren, ta, en, hi, tv] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getMoviesByLanguage("ta"),
          getMoviesByLanguage("en"),
          getMoviesByLanguage("hi"),
          getTrendingTV(),
        ]);

        setPopular(pop);
        setTrending(tren);
        setTamil(ta);
        setEnglish(en);
        setHindi(hi);
        setWebSeries(tv);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      alert("Search box is empty!");
      return;
    }

    setIsSearching(true);

    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    }
  };

  const handleFavorite = (movie) => {
    const currentUserEmail = localStorage.getItem("currentUser");

    if (!currentUserEmail) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
      (u) => u.email === currentUserEmail
    );

    if (userIndex === -1) return;

    let updatedFavorites = [
      ...(users[userIndex].favorites || []),
    ];

    const exists = updatedFavorites.find(
      (f) => f.id === movie.id
    );

    if (exists) {
      updatedFavorites = updatedFavorites.filter(
        (f) => f.id !== movie.id
      );
    } else {
      updatedFavorites.push(movie);
    }

    users[userIndex].favorites = updatedFavorites;

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    setFavorites(updatedFavorites);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-cyan-400 text-xl font-medium animate-pulse">
          Loading movies...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0f172a] to-[#020617] text-white">

      <Header onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 py-8">

        {isSearching ? (
          <MovieSection
            title="Search Results"
            movies={searchResults}
            onFavorite={handleFavorite}
            favorites={favorites}
          />
        ) : (
          <>
            <MovieSection
              title="Trending Worldwide"
              movies={trending}
              onFavorite={handleFavorite}
              favorites={favorites}
            />

            <MovieSection
              title="Tamil Trending"
              movies={tamil}
              onFavorite={handleFavorite}
              favorites={favorites}
            />

            <MovieSection
              title="Popular Worldwide"
              movies={popular}
              onFavorite={handleFavorite}
              favorites={favorites}
            />

            <MovieSection
              title="English Trending"
              movies={english}
              onFavorite={handleFavorite}
              favorites={favorites}
            />

            <MovieSection
              title="Hindi Trending"
              movies={hindi}
              onFavorite={handleFavorite}
              favorites={favorites}
            />

            <MovieSection
              title="Trending Web Series"
              movies={webSeries}
              onFavorite={handleFavorite}
              favorites={favorites}
            />
          </>
        )}

      </main>

      <Footer />

    </div>
  );
}

export default Home;